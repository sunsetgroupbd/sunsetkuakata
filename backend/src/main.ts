import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix
  app.setGlobalPrefix("api/v1");

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // CORS configuration
  const rawOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
    : [];

  const defaultOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://sunsetkuakatahotel.com",
    "https://www.sunsetkuakatahotel.com",
    "https://sunsetgroupbd.com",
    "https://www.sunsetgroupbd.com",
    "http://sunsetgroupbd.com",
    "http://www.sunsetgroupbd.com",
  ];

  const allowedOrigins = Array.from(new Set([...defaultOrigins, ...rawOrigins]));

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app") ||
        origin.includes("sunsetkuakatahotel.com") ||
        origin.includes("sunsetgroupbd.com") ||
        process.env.CORS_ORIGIN === "*"
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle("Sunset Kuakata Hotel & Resort API")
    .setDescription("Backend API for investor lead capture, CRM pipeline, and live package pricing")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 Sunset Kuakata API running on http://localhost:${port}/api/v1`);
  console.log(`📚 Swagger documentation at http://localhost:${port}/api/docs`);
}

bootstrap();
