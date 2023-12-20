import { Request } from "express";

export interface AuthenticatedRequest extends Request {
    user?: any; // Change 'any' to the actual type of your user object if available
}