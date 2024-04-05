import { Request, Response, Router } from "express";
import pino from "pino";
import { UserService } from "../services/user.service";

export class AppController {
  public router: Router = Router();
  private log: pino.Logger = pino();

  constructor(private userService: UserService) {
    this.initializeRouter();
  }

  private initializeRouter() {
    this.router.get("/login", function (req, res) {
      res.render("login");
    });

    this.router.get("/logout", function (req:any, res) {
      delete req.session.user;
      res.render("login");
    });

    this.router.get("/signup", function (req, res) {
      res.render("signup");
    });

    this.router.post("/signup", async (req: any, res) => {
      try {
        req.session.user = await this.userService.createUser(req.body.username, req.body.email, req.body.password);
        res.redirect("/");
      } catch (error) {
        this.log.error(error);
        res.status(500).send('An error occurred');
      }
    });

    this.router.post("/processLogin", async (req: any, res) => {
      try {
        const user = await this.userService.authenticateUser(req.body.username, req.body.password);
        if (user) {
          req.session.user = user;
          res.redirect("/");
        } else {
          res.status(401).send("Invalid username or password");
        }
      } catch (error) {
        this.log.error(error);
        res.status(500).send('An error occurred');
      }
    });

    this.router.use((req: any, res, next) => {
      if (req.session.user) {
        next();
      } else {
        res.render("login", {
          error: "You need to log in first",
        });
      }
    });

    this.router.get("/", (req: any, res: Response) => {
      try {
        res.render("home", {
          user: req.session.user,
        });
      } catch (error) {
        this.log.error(error);
        res.status(500).send('An error occurred');
      }
    });
  }
}