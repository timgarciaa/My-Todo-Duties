"use client";
import { useEffect, useState } from "react";
import { getDuties } from "@/lib/api";
import { Duty } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [duties, setDuties] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const data = await getDuties();
      console.log(data);
      setDuties(data);
      setIsLoading(false);
    };

    getData();
  }, []);

  const onCardClick = (id: number) => {
    router.push(`/update/${id}`);
  };
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="flex justify-between w-full mb-10">
        <h1 className="text-2xl">My Todo Duties</h1>
        <Button>
          <Link href="/create">Create Todo</Link>
        </Button>
      </div>

      {isLoading ? (
        <div>Empty</div>
      ) : (
        <div className="bg-slate-300 w-full h-full flex items-center justify-center flex-wrap gap-5 p-10 rounded-lg">
          {duties.map((duty: Duty) => (
            <Card
              key={duty.id}
              onClick={() => onCardClick(duty.id as number)}
              className="flex items-center justify-center min-w-40 min-h-40 cursor-pointer"
            >
              {duty.title}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
