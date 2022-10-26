import prisma from "../src/utils/prisma";
import mysql from "../src/utils/db";

const originData = await mysql.get("student", "*");

prisma.user.add({});
