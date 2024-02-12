import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {userId} = auth()

    if(!userId){
        return NextResponse.json({ error: "UNAUTHORIZED", status: 401 })
    }

    const { title, description, date, completed, important } = await req.json();

    if (!title || !description || !date) {
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      });
    }

    if (title.length < 3) {
      return NextResponse.json({
        error: "Title must be at least 3 characters long",
        status: 400,
      });
    }

    const task = await prisma.task.create({
        data: {
          title,
          description,
          date,
          isCompleted: completed,
          isImportant: important,
          userId,
        },
      });
  
      return NextResponse.json(task);

  } catch (error) {
    console.log("ERROR CREATING TASK: ", error);
    return NextResponse.json({ error: "ERROR CREATING TASK", status: 500 });
  }
}

export async function GET(req: Request) {
  try {

    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(tasks);

  } catch (error) {
    console.log("ERROR GETTING TASK: ", error);
    return NextResponse.json({ error: "ERROR GETTING TASK", status: 500 });
  }
}

export async function PUT(req: Request) {
  try {



  } catch (error) {
    console.log("ERROR UPDATING TASK: ", error);
    return NextResponse.json({ error: "ERROR UPDATING TASK", status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {



  } catch (error) {
    console.log("ERROR DELETING TASK: ", error);
    return NextResponse.json({ error: "ERROR DELETING TASK", status: 500 });
  }
}
