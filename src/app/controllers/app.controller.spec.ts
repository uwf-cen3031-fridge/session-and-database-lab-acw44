import { describe, expect, it } from "@jest/globals";
import request from "supertest";
import express, { Application } from "express";
import { AppController } from "./app.controller";
import { HandlebarsMiddleware } from '../middleware/handlebars.middleware';
import { UserService } from "../services/user.service";

describe("AppController", () => {
  let app: Application;
  let controller: AppController;

  // Run this code before every test
  beforeAll(() => {
    // Create an express instance for testing
    app = express();

    // Set up handlebars for our templating
    HandlebarsMiddleware.setup(app);

    // Our userService instance to pass to the controller
    let userService = new UserService();

    // Our controller instance to test
    controller = new AppController(userService);

    // Load the controller's router for testing
    app.use(controller.router);
  });

  it('should render the login page', async () => {
    const res = await request(app).get('/login');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('<form method="POST" action="/processLogin">');
  });
});