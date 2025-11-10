import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, DoorOpen, Calendar, AlertCircle, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";

const Dashboard = () => {
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole) {
      setRole(userRole);
    }
  }, []);

  const stats = [
    {
      title: "Total Faculty",
      value: "42",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Total Courses",
      value: "28",
      icon: BookOpen,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Total Rooms",
      value: "15",
      icon: DoorOpen,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      title: "Active Timetables",
      value: "6",
      icon: Calendar,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  const recentActivities = [
    {
      title: "Timetable Generated",
      description: "CSE 3rd Year timetable created successfully",
      time: "2 hours ago",
      status: "success",
    },
    {
      title: "Faculty Added",
      description: "Dr. John Smith added to Computer Science department",
      time: "5 hours ago",
      status: "success",
    },
    {
      title: "Conflict Detected",
      description: "Room 301 has overlapping assignments on Monday",
      time: "1 day ago",
      status: "warning",
    },
    {
      title: "Course Updated",
      description: "Database Management - credit hours modified",
      time: "2 days ago",
      status: "success",
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome to {role === "admin" ? "Admin" : role === "faculty" ? "Faculty" : "Student"} Dashboard
          </h1>
          <p className="text-muted-foreground">Manage your academic scheduling efficiently</p>
        </div>

        {role === "admin" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className={`mt-1 ${activity.status === "success" ? "text-accent" : "text-warning"}`}>
                    {activity.status === "success" ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <AlertCircle className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{activity.title}</h3>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {(role === "faculty" || role === "student") && (
          <Card>
            <CardHeader>
              <CardTitle>Quick Access</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <h3 className="font-medium text-foreground mb-1">View Your Timetable</h3>
                  <p className="text-sm text-muted-foreground">
                    Access your personalized class schedule and upcoming sessions
                  </p>
                </div>
                {role === "faculty" && (
                  <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                    <h3 className="font-medium text-foreground mb-1">Availability Status</h3>
                    <p className="text-sm text-muted-foreground">
                      Update your availability for better timetable scheduling
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
