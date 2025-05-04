import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import userRoutes from "./routes/user.routes";
import otpRoutes from './routes/otp.routes'

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/otp", otpRoutes);

export default app;
