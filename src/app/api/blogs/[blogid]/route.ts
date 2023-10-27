import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { dbConnect } from "../route";

export const GET = async (request: NextRequest) => {

  try {

    const id = request.url.split("/blogs/")[1];

    await dbConnect();

    const blogData = await prisma.blogPost.findFirst({
      where: {
        id
      }
    });

    if (!blogData) {

      return NextResponse.json(
        { message: "ID Not Found...!" }, { status: 404 }
      );

    }

    return NextResponse.json(
      { data: blogData }
    );

  } catch (error) {

    console.log(error);

  } finally {

    await prisma.$disconnect();

  }

};

export const PUT = async (request: NextRequest) => {

  try {

    const id = request.url.split("/blogs/")[1];

    const { title, description, image } = await request.json();

    await dbConnect();

    const updateData = await prisma.blogPost.update({
      data: {
        title,
        description,
        image
      },
      where: {
        id
      }
    });

    return NextResponse.json(
      { message: "Data Updated", data: updateData }
    );

  } catch (error) {

    console.log(error);

  } finally {

    await prisma.$disconnect();

  }

};

// export async function PUT(request, { params }) {
//   try {
//     const reqBody = await request.json();
//     await Blog.findByIdAndUpdate(params.blogid, reqBody);
//     return NextResponse.json({
//       success: true,
//       message: "Blog updated successfully",
//     });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request, { params }) {
//   try {
//     await Blog.findByIdAndDelete(params.blogid);
//     return NextResponse.json({
//       success: true,
//       message: "Blog deleted successfully",
//     });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }

export const DELETE = async (request: NextRequest) => {

  try {

    const id = request.url.split("/blogs/")[1];

    await dbConnect();

    await prisma.blogPost.delete({
      where: {
        id
      }
    });

    return NextResponse.json(
      { message: "Data Deleted" }
    );

  } catch (error) {

    console.log(error);

  } finally {

    await prisma.$disconnect();

  }

};