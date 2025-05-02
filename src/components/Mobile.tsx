"use client";

import { act, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getNamedMiddlewareRegex } from "next/dist/shared/lib/router/utils/route-regex";
import { GrPowerReset } from "react-icons/gr";

export default function Mobile() {
  const weightArr = Array.from({ length: 111 }, (_, i) => 40 + i);
  const heightArr = Array.from({ length: 71 }, (_, i) => 140 + i);
  const ageArr = Array.from({ length: 150 }, (_, i) => 1 + i);
  const activityLevels = [
    { value: 1.2, label: "Sedentary (little or no exercise)" },
    { value: 1.375, label: "Light (1-3 days/week)" },
    { value: 1.55, label: "Moderate (3-5 days/week)" },
    { value: 1.725, label: "Active (6-7 days/week)" },
    { value: 1.9, label: "Very Active (twice/day etc.)" },
  ];

  const [weight, setWeight] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState<string>("");
  const [activity, setActivity] = useState<string>("");
  const [basalMetabolicRate, setBasalMetabolicRate] = useState<number | null>(
    null
  );
  const [totalDailyEnergyExpenditure, setTotalDailyEnergyExpenditure] =
    useState<number | null>(null);

  const calculateHealthMetrics = () => {
    if (!weight || !height || !age || !gender || !activity) {
      return toast.error("All fields are required!");
    }

    const activityFactor = parseFloat(activity);

    let bmr = 0;

    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === "female") {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const tdee = bmr * activityFactor;
    setBasalMetabolicRate(Math.round(bmr));
    setTotalDailyEnergyExpenditure(Math.round(tdee));
  };

  const resetValue = () => {
    setWeight(null);
    setHeight(null);
    setAge(null);
    setGender("");
    setActivity("");
    setBasalMetabolicRate(null);
    setTotalDailyEnergyExpenditure(null);
  };

  return (
    <div className="min-h-screen bg-black text-white py-6 px-4 flex flex-col items-center justify-center">
      <Card className="w-full max-w-md md:max-w-lg bg-zinc-900 border border-zinc-700 shadow-xl rounded-2xl">
        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-xl font-bold text-white">
            Calorie Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-2">
            <Label htmlFor="weight" className="text-white">
              Weight (kg)
            </Label>
            <Select
              value={weight === null ? "" : weight?.toString()}
              onValueChange={(val) => setWeight(Number(val))}
            >
              <SelectTrigger className="w-full bg-zinc-800 border-zinc-600 text-white">
                <SelectValue placeholder="Select weight" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                <SelectGroup>
                  <SelectLabel>Select your weight</SelectLabel>
                  {weightArr.map((item) => (
                    <SelectItem key={item} value={item.toString()}>
                      {item} kg
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="height" className="text-white">
              Height (cm)
            </Label>
            <Select
              value={height === null ? "" : height?.toString()}
              onValueChange={(val) => setHeight(Number(val))}
            >
              <SelectTrigger className="w-full bg-zinc-800 border-zinc-600 text-white">
                <SelectValue placeholder="Select height" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                <SelectGroup>
                  <SelectLabel>Select your height</SelectLabel>
                  {heightArr.map((item) => (
                    <SelectItem key={item} value={item.toString()}>
                      {item} cm
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="age" className="text-white">
              Age{" "}
            </Label>
            <Select
              value={age === null ? "" : age?.toString()}
              onValueChange={(val) => setAge(Number(val))}
            >
              <SelectTrigger className="w-full bg-zinc-800 border-zinc-600 text-white">
                <SelectValue placeholder="Select age" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                <SelectGroup>
                  <SelectLabel>Select your age</SelectLabel>
                  {ageArr.map((item) => (
                    <SelectItem key={item} value={item.toString()}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="hip" className="text-white">
              Activity Level
            </Label>
            <Select
              value={activity === null ? "" : activity.toString()}
              onValueChange={(val) => setActivity(val)}
            >
              <SelectTrigger className="w-full bg-zinc-800 border-zinc-600 text-white">
                <SelectValue placeholder="Select hip" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                <SelectGroup>
                  <SelectLabel>Select activity level </SelectLabel>
                  {activityLevels.map((item) => (
                    <SelectItem key={item.value} value={item.value.toString()}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="gender" className="text-white">
              Gender
            </Label>
            <Select
              value={gender === null ? "" : gender.toString()}
              onValueChange={(val) => setGender(val)}
            >
              <SelectTrigger className="w-full bg-zinc-800 border-zinc-600 text-white">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                <SelectGroup>
                  <SelectLabel>Select your gender</SelectLabel>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center items-center gap-3">
            <Button
              className="w-[90%] bg-blue-600 hover:bg-blue-700 cursor-pointer"
              onClick={calculateHealthMetrics}
            >
              Calculate
            </Button>
            <GrPowerReset
              onClick={resetValue}
              className="w-fit text-white font-bold text-2xl cursor-pointer"
            />
          </div>
        </CardContent>
      </Card>

      {basalMetabolicRate !== null && totalDailyEnergyExpenditure !== null && (
        <div className="bg-zinc-900 w-full max-w-md md:max-w-lg text-white p-4 mt-6 md:ml-10 rounded-lg border border-zinc-700  text-center space-y-2">
          <p className="text-xl font-semibold text-blue-400">
            Your Health Metrics
          </p>

          <p className="text-base">
            Estimated BMR:{" "}
            <span className="font-medium text-white">
              {basalMetabolicRate} kcal/day
            </span>
          </p>

          <p className="text-base">
            Calories to Maintain Weight (TDEE):{" "}
            <span className="font-medium text-white">
              {totalDailyEnergyExpenditure} kcal/day
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
