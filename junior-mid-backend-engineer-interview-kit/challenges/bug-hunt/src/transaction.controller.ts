import { Router } from "express";
import { AppError } from "../../mini-app-completion/src/errors";
import { TransactionService } from "./transaction.service";

export function createTransactionRouter(service = new TransactionService()) {
  const router = Router();

  router.post("/funding", (request, response) => {
    try {
      response.status(201).json({
        funding: service.fundWallet(request.body)
      });
    } catch (error) {
      if (error instanceof AppError) {
        response.status(error.statusCode).json({
          error: {
            code: error.code,
            message: error.message
          }
        });
        return;
      }

      response.status(500).json({
        error: {
          code: "INTERNAL_ERROR",
          message: "Something went wrong."
        }
      });
    }
  });

  return router;
}
