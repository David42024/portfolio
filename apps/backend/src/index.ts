import app from "./app";
import { env } from "./config/env";
import { prisma } from "./config/db";


const PORT = env.PORT || 3001;

async function main() {
  try {
    await prisma.$connect();
    console.log("✅ Conexión a la base de datos exitosa");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📚 API disponible en http://localhost:${PORT}/api/v1`);
      console.log(`🌍 Entorno: ${env.NODE_ENV}`);
    });

  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    await prisma.$disconnect();
    process.exit(1);
  } 
}

// Manejo de cierre graceful
process.on("SIGINT", async () => { //interrupción desde teclado
  console.log("\n🛑 Cerrando servidor...");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => { //terminación del sistema
  console.log("\n🛑 Cerrando servidor...");
  await prisma.$disconnect();
  process.exit(0);
});

main();