import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const dbConnect = async () => {

  try {

    await prisma.$connect();

  } catch (error) {

    return Error("Connection Error");

  }

};

export const GET = async () => {

  try {

    await dbConnect();

    const blogs = await prisma.blogPost.findMany();

    return NextResponse.json(
      { data: blogs }, { status: 200 }
    );

  } catch (error) {

    console.log(error);

  } finally {

    await prisma.$disconnect();

  }

};

export const POST = async (request: NextResponse) => {

  try {

    const { title, description, image } = await request.json();

    await dbConnect();

    const post = await prisma.blogPost.create({
      data: {
        title,
        description,
        image
      }
    });

    return NextResponse.json(
      { message: "Data Added", data: post }, { status: 201 }
    );

  } catch (error) {

    console.log(error);

  } finally {

    await prisma.$disconnect();

  }

};