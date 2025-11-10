import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Printer } from "lucide-react";
import { toast } from "sonner";

interface TimeSlot {
  time: string;
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
}

const Timetable = () => {
  const [timetableData] = useState<TimeSlot[]>([
    {
      time: "9:00 - 10:00",
      monday: "CS101\nDr. Sarah Johnson\nRoom 301",
      tuesday: "MATH201\nProf. Michael Chen\nRoom 205",
      wednesday: "CS101\nDr. Sarah Johnson\nRoom 301",
      thursday: "PHY301\nDr. Emily Rodriguez\nLab-A",
      friday: "MATH201\nProf. Michael Chen\nRoom 205",
    },
    {
      time: "10:00 - 11:00",
      monday: "PHY301\nDr. Emily Rodriguez\nLab-A",
      tuesday: "CS101\nDr. Sarah Johnson\nRoom 301",
      wednesday: "MATH201\nProf. Michael Chen\nRoom 205",
      thursday: "CS101\nDr. Sarah Johnson\nRoom 301",
      friday: "",
    },
    {
      time: "11:00 - 12:00",
      monday: "MATH201\nProf. Michael Chen\nRoom 205",
      tuesday: "PHY301\nDr. Emily Rodriguez\nLab-A",
      wednesday: "",
      thursday: "MATH201\nProf. Michael Chen\nRoom 205",
      friday: "",
    },
    {
      time: "12:00 - 1:00",
      monday: "",
      tuesday: "",
      wednesday: "PHY301\nDr. Emily Rodriguez\nLab-A",
      thursday: "",
      friday: "",
    },
    {
      time: "1:00 - 2:00",
      monday: "LUNCH BREAK",
      tuesday: "LUNCH BREAK",
      wednesday: "LUNCH BREAK",
      thursday: "LUNCH BREAK",
      friday: "LUNCH BREAK",
    },
    {
      time: "2:00 - 3:00",
      monday: "CS101\nDr. Sarah Johnson\nRoom 301",
      tuesday: "MATH201\nProf. Michael Chen\nRoom 205",
      wednesday: "CS101\nDr. Sarah Johnson\nRoom 301",
      thursday: "PHY301\nDr. Emily Rodriguez\nLab-A",
      friday: "",
    },
    {
      time: "3:00 - 4:00",
      monday: "PHY301\nDr. Emily Rodriguez\nLab-A",
      tuesday: "",
      wednesday: "MATH201\nProf. Michael Chen\nRoom 205",
      thursday: "CS101\nDr. Sarah Johnson\nRoom 301",
      friday: "",
    },
  ]);

  const handleDownloadPDF = () => {
    toast.success("Timetable PDF downloaded successfully");
  };

  const handlePrint = () => {
    window.print();
    toast.success("Print dialog opened");
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Timetable View</h1>
            <p className="text-muted-foreground">Computer Science - 3rd Year - Spring 2025</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleDownloadPDF} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button onClick={handlePrint} variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="p-3 text-left font-semibold bg-muted min-w-[120px]">Time</th>
                    {days.map((day) => (
                      <th key={day} className="p-3 text-center font-semibold bg-muted min-w-[180px]">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timetableData.map((slot, index) => (
                    <tr key={index} className="border-b border-border">
                      <td className="p-3 font-medium bg-muted/50 text-sm">{slot.time}</td>
                      {days.map((day) => {
                        const dayKey = day.toLowerCase() as keyof TimeSlot;
                        const content = slot[dayKey];
                        const isLunch = content === "LUNCH BREAK";
                        const isEmpty = !content || content === "";

                        return (
                          <td
                            key={day}
                            className={`p-3 text-center text-sm ${
                              isLunch
                                ? "bg-warning/10 font-medium text-warning-foreground"
                                : isEmpty
                                ? "bg-muted/30"
                                : "bg-primary/5 hover:bg-primary/10 transition-colors"
                            }`}
                          >
                            {content && (
                              <div className="whitespace-pre-line">
                                {isLunch ? (
                                  <span className="font-semibold">{content}</span>
                                ) : (
                                  <>
                                    {content.split("\n").map((line, i) => (
                                      <div key={i} className={i === 0 ? "font-semibold text-primary" : "text-muted-foreground text-xs"}>
                                        {line}
                                      </div>
                                    ))}
                                  </>
                                )}
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-primary/10 border border-primary/20 rounded"></div>
                <span>Regular Class</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-warning/10 border border-warning/20 rounded"></div>
                <span>Lunch Break</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-muted/30 border border-border rounded"></div>
                <span>Free Period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Classes:</span>
                <span className="font-semibold">18</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Free Periods:</span>
                <span className="font-semibold">7</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Weekly Hours:</span>
                <span className="font-semibold">18 hrs</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Course List</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <div>• CS101 - Programming</div>
              <div>• MATH201 - Calculus II</div>
              <div>• PHY301 - Quantum Physics</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Timetable;
