import express, { request, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import LocalStrategy from "passport-local";
import GoogleStrategy from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import session from "express-session";
// import { configDotenv } from "dotenv";
import { getUsers, createUser, getUserByEmail } from "./services.js";

const app = express();
const PORT = 5000;
const secret = "developingmini";

const allowedOrigins = [
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
];

// configDotenv();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
  
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true) // to allow request with no origin 
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    credentials: true,
}));

app.use(passport.initialize());
app.use(cookieParser());

passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, (req, email, done) => {
    console.log("LocalStrategy triggered");  // Should log this
    done(null, { id: 1, email });  // Always succeed for testing purposes
}));

passport.use(new GoogleStrategy({
    /** Sensitive Info are deleted due to git policy */
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
        const users = await getUsers();
        const user = users.find(user => user.email === profile.email);
        console.log("ser user: ", users);
        if (!user) {
            const newUser = { id: profile.id, email: profile.emails[0].value };
            await createUser(newUser);
        }
        return cb(null, profile);
  }
));

// token verification middleware
const authenticateJWT = (req, res, next) => {
    const requestApp = req.query.redirectApp;
    /* ****  COMMENT OUT Code function to provide the unique token name for each app  *****
        // const tokenName = requestApp === "ContactApp" ? "contact_token"
        //                 : requestApp === "SaleApp" ? "sale_token"  
        //                 : requestApp === "ProductApp" ? "product_token"
        //                 : "token"  
    * **********/ 

    const token = req.cookies.token;
    console.log(req.cookies.token);

    if (!token) {
        console.log("No token found in cookies");
        return res.sendStatus(403);  // Forbidden
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            console.log("Token verification failed:", err);
            return res.sendStatus(403);  // Forbidden
        }
        req.user = user;
        next();
    });
};

app.get("/auth/google/callback", 
    passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
    (req, res) => {
        const token = jwt.sign({ user: req.user }, secret, { expiresIn: '1d' });

        /* ****  COMMENT OUT Code function to provide the unique token name for each app  *****
        // Extract redirectApp from query parameters
        // const redirectApp = req.query.redirectApp || "ProductApp";
        // const tokenName = redirectApp === "ProductApp" ? "product_token"
        //                   : redirectApp === "ContactApp" ? "contact_token"
        //                   : redirectApp === "SaleApp" ? "sale_token" 
        //                   : null;
        ***/

        res.cookie("token", token, { 
            httpOnly: false, 
            secure: false,
            path: '/'       
        });
        
        // Redirect based on the redirectApp
        switch (redirectApp) {
            case "ProductApp":
                res.redirect("http://localhost:3003");
                break;
            case "ContactApp":
                res.redirect("http://localhost:3002");
                break;
            case "SaleApp":
                res.redirect("http://localhost:3001");
                break;
            default:
                res.redirect("http://localhost:3003"); 
                break;
        }
    }
);

app.get("/auth/google", 
    passport.authenticate("google", { scope: ["profile", "email"]})
);

app.post('/auth/login', async (req, res) => {
    const email = req.body.email;
    console.log("Local Params: ", req.query);
    const user = await getUserByEmail(email);
    if (!user) {
        const users = await getUsers();
        console.log();

        const newUser = { id: users.length + 1, email };
        await createUser(newUser);
    }
    const token = jwt.sign({ user: email }, secret, { expiresIn: '1d'})

    const redirectApp = req.query.redirectApp || "ProductApp";
    // const tokenName = redirectApp === "ProductApp" ? "product_token"
    //                     : redirectApp === "ContactApp" ? "contact_token"
    //                     : redirectApp === "SaleApp" ? "sale_token" 
    //                     : null

    res.cookie("token", token, { 
        httpOnly: false, 
        sameSite: "Lax",  
        secure: false, 
        path: '/'       
    });


    switch (redirectApp) {
        case "ProductApp":
            res.redirect("http://localhost:3003");
            break;
        case "ContactApp":
            res.redirect("http://localhost:3002");
            break;
        case "SaleApp":
            res.redirect("http://localhost:3001");
            break;
    }    
});

app.post("/auth/verify-token", authenticateJWT, (req, res) => {
    res.json({ message: "Token is valid", user: req.user});
});

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((user, done) => {
    done(null, user.id);
});

app.listen(PORT, () => console.log("Server is running on port: ", PORT));