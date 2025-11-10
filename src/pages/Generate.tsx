import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Generate = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [formData, setFormData] = useState({
    semester: "",
    department: "",
    year: "",
    constraints: {
      noFridayAfternoon: false,
      maxClassesPerDay: false,
      lunchBreak: false,
    },
  });

  const handleGenerate = async () => {
    if (!formData.semester || !formData.department || !formData.year) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsGenerating(true);
    setGenerationComplete(false);

    // Simulate timetable generation
    setTimeout(() => {
      setIsGenerating(false);
      setGenerationComplete(true);
      toast.success("Timetable generated successfully!");
    }, 3000);
  };

  const handleViewTimetable = () => {
    navigate("/timetable");
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Generate Timetable</h1>
          <p className="text-muted-foreground">
            Automatically create a conflict-free timetable based on your constraints
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Configuration</CardTitle>
              <CardDescription>Select semester, department, and year</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Select
                  value={formData.semester}
                  onValueChange={(value) => setFormData({ ...formData, semester: value })}
                >
                  <SelectTrigger id="semester">
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spring-2025">Spring 2025</SelectItem>
                    <SelectItem value="fall-2024">Fall 2024</SelectItem>
                    <SelectItem value="summer-2024">Summer 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => setFormData({ ...formData, department: value })}
                >
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Academic Year</Label>
                <Select
                  value={formData.year}
                  onValueChange={(value) => setFormData({ ...formData, year: value })}
                >
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st Year</SelectItem>
                    <SelectItem value="2">2nd Year</SelectItem>
                    <SelectItem value="3">3rd Year</SelectItem>
                    <SelectItem value="4">4th Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scheduling Constraints</CardTitle>
              <CardDescription>Apply rules for timetable generation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="noFridayAfternoon"
                  checked={formData.constraints.noFridayAfternoon}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      constraints: { ...formData.constraints, noFridayAfternoon: checked as boolean },
                    })
                  }
                />
                <Label htmlFor="noFridayAfternoon" className="cursor-pointer">
                  No classes on Friday afternoon
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="maxClassesPerDay"
                  checked={formData.constraints.maxClassesPerDay}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      constraints: { ...formData.constraints, maxClassesPerDay: checked as boolean },
                    })
                  }
                />
                <Label htmlFor="maxClassesPerDay" className="cursor-pointer">
                  Limit maximum 5 classes per day
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lunchBreak"
                  checked={formData.constraints.lunchBreak}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      constraints: { ...formData.constraints, lunchBreak: checked as boolean },
                    })
                  }
                />
                <Label htmlFor="lunchBreak" className="cursor-pointer">
                  Ensure lunch break (1-2 PM)
                </Label>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {!generationComplete && !isGenerating && (
                <Button onClick={handleGenerate} className="w-full" size="lg">
                  <Calendar className="mr-2 h-5 w-5" />
                  Generate Timetable
                </Button>
              )}

              {isGenerating && (
                <div className="flex flex-col items-center justify-center space-y-4 py-8">
                  <RefreshCw className="h-12 w-12 animate-spin text-primary" />
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">Generating Timetable...</h3>
                    <p className="text-muted-foreground">
                      Checking faculty availability, room conflicts, and applying constraints
                    </p>
                  </div>
                </div>
              )}

              {generationComplete && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-3 p-6 bg-accent/10 rounded-lg border border-accent/20">
                    <CheckCircle className="h-8 w-8 text-accent" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">Generation Complete!</h3>
                      <p className="text-sm text-muted-foreground">
                        Your timetable has been created without conflicts
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button onClick={handleViewTimetable} size="lg">
                      View Timetable
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setGenerationComplete(false);
                        toast.info("Ready to generate new timetable");
                      }}
                      size="lg"
                    >
                      Generate Another
                    </Button>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span>No faculty conflicts detected</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span>No room double-bookings found</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span>All constraints satisfied</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Generate;
