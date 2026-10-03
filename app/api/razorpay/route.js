import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";
import User from "@/models/User";
import mongoose from "mongoose";

export const POST = async (req) => {
    try {
        await connectDb();

        let body = await req.formData();
        body = Object.fromEntries(body);

        console.log("========== RAZORPAY VALIDATION ==========");
        console.log("Order ID:", body.razorpay_order_id);
        console.log("Payment ID:", body.razorpay_payment_id);

        // Find payment created during initiation
        const payment = await Payment.findOne({
            oid: body.razorpay_order_id
        });

        console.log("Payment:", payment);

        if (!payment) {
            return NextResponse.json({
                success: false,
                message: "Order Id not found"
            });
        }

        // Find receiver
        const user = await User.findOne({
            username: payment.to_username
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            });
        }

        const secret = user.razorpaysecret;

        if (!secret) {
            return NextResponse.json({
                success: false,
                message: "Razorpay secret not found"
            });
        }

        // Verify Razorpay signature
        const isValid = validatePaymentVerification(
            {
                order_id: body.razorpay_order_id,
                payment_id: body.razorpay_payment_id
            },
            body.razorpay_signature,
            secret
        );

        if (!isValid) {
            return NextResponse.json({
                success: false,
                message: "Payment Verification Failed"
            });
        }

        // Mark payment completed
        const updatedPayment = await Payment.findOneAndUpdate(
            {
                oid: body.razorpay_order_id
            },
            {
                done: true,
                paymentId: body.razorpay_payment_id,
                status: "paid"
            },
            {
                new: true
            }
        );

        if (!updatedPayment) {
            return NextResponse.json({
                success: false,
                message: "Payment update failed"
            });
        }

        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_username}?paymentdone=true`
        );

    } catch (error) {
        console.error("Razorpay validation error:", error);

        return NextResponse.json({
            success: false,
            message: "Payment validation failed",
            error: error.message
        });
    }
};