import swaggerJsdoc from "swagger-jsdoc";


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "GYM Project",
            version: "1.0.0",
            description: "Simple Gym App."
        },
        servers : [{
           url: `http://localhost:${process.env.PORT || 3000}`
        }] // or "/" (for the current API)
    },
    apis: ["./src/**/*.ts"]
};

export const specs = swaggerJsdoc(options);