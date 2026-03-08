import express from "express";
import aiRoutes from "./routes/ai.route";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello from server");
})

app.use("/api/ai", aiRoutes);

export default app

