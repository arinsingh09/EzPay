import express from "express";
import { z } from "zod";
import cors from "cors";
import db from "@repo/db/client";

const app = express();
app.use(express.json());
app.use(cors());

const paymentInformationSchema = z.object({
    token: z.string(),
    userId: z.string(),
    amount: z.string(),
});

app.post("/hdfcWebhook", async (req, res) => {
    try {
        const paymentInformation = paymentInformationSchema.parse(req.body);

        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId),
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount),
                    },
                },
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token,
                },
                data: {
                    status: "Success",
                },
            }),
        ]);

        res.json({
            message: "Captured",
        });
    } catch (e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook",
        });
    }
});

app.listen(3003);
