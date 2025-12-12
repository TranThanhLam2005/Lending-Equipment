import {useEffect, useState} from "react";
import type {LendingRecord, Equipment} from "@/types/Type";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  BookOpen,
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

interface DashboardStats {
  totalBorrowed: number;
  activeBorrows: number;
  returned: number;
  overdue: number;
}

// Sample data for UI preview
const SAMPLE_LENDING_RECORDS: LendingRecord[] = [
  {
    ID: "1",
    BorrowerID: "STU001",
    SuperviseID: "SUP001",
    EquipmentID: "EQ001",
    BorrowDate: "2025-11-15T10:00:00Z",
    DueDate: "2025-12-15T10:00:00Z",
    Purpose: "Lab project - Circuit design and testing",
    Status: "Active",
    EquipmentName: "Digital Oscilloscope",
    SupervisorName: "Dr. Smith",
    BorrowerName: "John Doe",
  },
  {
    ID: "2",
    BorrowerID: "STU001",
    SuperviseID: "SUP002",
    EquipmentID: "EQ002",
    BorrowDate: "2025-10-20T14:00:00Z",
    ReturnDate: "2025-11-10T16:00:00Z",
    DueDate: "2025-11-20T14:00:00Z",
    Purpose: "Photography assignment for media class",
    Status: "Returned",
    EquipmentName: "Canon DSLR Camera",
    SupervisorName: "Prof. Johnson",
    BorrowerName: "John Doe",
  },
  {
    ID: "3",
    BorrowerID: "STU001",
    SuperviseID: "SUP001",
    EquipmentID: "EQ003",
    BorrowDate: "2025-09-05T09:00:00Z",
    ReturnDate: "2025-10-01T15:00:00Z",
    DueDate: "2025-09-25T09:00:00Z",
    Purpose: "Robotics competition preparation",
    Status: "Returned",
    EquipmentName: "Arduino Mega Kit",
    SupervisorName: "Dr. Smith",
    BorrowerName: "John Doe",
  },
  {
    ID: "4",
    BorrowerID: "STU001",
    SuperviseID: "SUP003",
    EquipmentID: "EQ004",
    BorrowDate: "2025-11-28T11:00:00Z",
    DueDate: "2025-12-08T11:00:00Z",
    Purpose: "Senior thesis data collection",
    Status: "Active",
    EquipmentName: "Data Logger",
    SupervisorName: "Dr. Williams",
    BorrowerName: "John Doe",
  },
  {
    ID: "5",
    BorrowerID: "STU001",
    SuperviseID: "SUP002",
    EquipmentID: "EQ005",
    BorrowDate: "2025-08-12T13:00:00Z",
    ReturnDate: "2025-09-05T10:00:00Z",
    DueDate: "2025-09-12T13:00:00Z",
    Purpose: "3D printing for engineering design project",
    Status: "Returned",
    EquipmentName: "3D Printer",
    SupervisorName: "Prof. Johnson",
    BorrowerName: "John Doe",
  },
  {
    ID: "6",
    BorrowerID: "STU001",
    SuperviseID: "SUP001",
    EquipmentID: "EQ006",
    BorrowDate: "2025-12-01T08:00:00Z",
    DueDate: "2025-12-05T08:00:00Z",
    Purpose: "Network configuration lab exercises",
    Status: "Overdue",
    EquipmentName: "Network Switch",
    SupervisorName: "Dr. Smith",
    BorrowerName: "John Doe",
  },
  {
    ID: "7",
    BorrowerID: "STU001",
    SuperviseID: "SUP003",
    EquipmentID: "EQ007",
    BorrowDate: "2025-07-15T10:00:00Z",
    ReturnDate: "2025-08-10T14:00:00Z",
    DueDate: "2025-08-15T10:00:00Z",
    Purpose: "Environmental monitoring research",
    Status: "Returned",
    EquipmentName: "Multimeter",
    SupervisorName: "Dr. Williams",
    BorrowerName: "John Doe",
  },
  {
    ID: "8",
    BorrowerID: "STU001",
    SuperviseID: "SUP002",
    EquipmentID: "EQ008",
    BorrowDate: "2025-12-10T15:00:00Z",
    DueDate: "2025-12-20T15:00:00Z",
    Purpose: "Video production for final project presentation",
    Status: "Active",
    EquipmentName: "Video Camera",
    SupervisorName: "Prof. Johnson",
    BorrowerName: "John Doe",
  },
];

const SAMPLE_EQUIPMENT: Equipment[] = [
  {
    ID: "EQ001",
    Name: "Digital Oscilloscope",
    Type: "Measurement",
    Status: "Borrowed",
    Condition: "Good",
    PurchaseDate: "2023-01-15",
    Venue: "Lab A",
    Description: "High-precision digital oscilloscope",
  },
  {
    ID: "EQ002",
    Name: "Canon DSLR Camera",
    Type: "Photography",
    Status: "Available",
    Condition: "Good",
    PurchaseDate: "2022-06-20",
    Venue: "Media Center",
    Description: "Professional DSLR camera with lens kit",
  },
  {
    ID: "EQ003",
    Name: "Arduino Mega Kit",
    Type: "Development",
    Status: "Available",
    Condition: "Good",
    PurchaseDate: "2023-03-10",
    Venue: "Robotics Lab",
    Description: "Complete Arduino development kit",
  },
  {
    ID: "EQ004",
    Name: "Data Logger",
    Type: "Measurement",
    Status: "Borrowed",
    Condition: "Fair",
    PurchaseDate: "2021-11-05",
    Venue: "Lab B",
    Description: "Multi-channel data logging device",
  },
  {
    ID: "EQ005",
    Name: "3D Printer",
    Type: "Manufacturing",
    Status: "Maintenance",
    Condition: "Needs Repair",
    PurchaseDate: "2022-09-12",
    Venue: "Maker Space",
    Description: "FDM 3D printer for prototyping",
  },
  {
    ID: "EQ006",
    Name: "Network Switch",
    Type: "Networking",
    Status: "Borrowed",
    Condition: "Good",
    PurchaseDate: "2023-05-18",
    Venue: "IT Lab",
    Description: "24-port managed network switch",
  },
  {
    ID: "EQ007",
    Name: "Multimeter",
    Type: "Measurement",
    Status: "Available",
    Condition: "Good",
    PurchaseDate: "2023-02-25",
    Venue: "Electronics Lab",
    Description: "Digital multimeter with various functions",
  },
  {
    ID: "EQ008",
    Name: "Video Camera",
    Type: "Video",
    Status: "Borrowed",
    Condition: "Good",
    PurchaseDate: "2022-08-30",
    Venue: "Media Center",
    Description: "4K professional video camera",
  },
  {
    ID: "EQ009",
    Name: "Soldering Station",
    Type: "Tools",
    Status: "Available",
    Condition: "Good",
    PurchaseDate: "2023-04-05",
    Venue: "Electronics Lab",
    Description: "Temperature-controlled soldering station",
  },
  {
    ID: "EQ010",
    Name: "Microscope",
    Type: "Laboratory",
    Status: "Maintenance",
    Condition: "Fair",
    PurchaseDate: "2021-07-15",
    Venue: "Biology Lab",
    Description: "Digital microscope with camera",
  },
];

const StudentDashBoard = () => {
  const [lendingRecords, setLendingRecords] = useState<LendingRecord[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalBorrowed: 0,
    activeBorrows: 0,
    returned: 0,
    overdue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Simulate API call with sample data
      await new Promise((resolve) => setTimeout(resolve, 800));

      const lendingData = SAMPLE_LENDING_RECORDS;
      const equipmentData = SAMPLE_EQUIPMENT;

      setLendingRecords(lendingData);
      setEquipment(equipmentData);

      // Calculate stats
      const now = new Date();
      const activeBorrows = lendingData.filter(
        (record) => !record.ReturnDate
      ).length;
      const returned = lendingData.filter((record) => record.ReturnDate).length;
      const overdue = lendingData.filter((record) => {
        if (record.ReturnDate) return false;
        if (!record.DueDate) return false;
        return new Date(record.DueDate) < now;
      }).length;

      setStats({
        totalBorrowed: lendingData.length,
        activeBorrows,
        returned,
        overdue,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Prepare chart data - lending activity by month
  const getLendingTrendData = () => {
    const monthlyData: {[key: string]: number} = {};

    lendingRecords.forEach((record) => {
      const date = new Date(record.BorrowDate);
      const monthKey = `${date.getMonth() + 1}/${date.getFullYear()}`;
      monthlyData[monthKey] = (monthlyData[monthKey] || 0) + 1;
    });

    return Object.entries(monthlyData)
      .map(([month, count]) => ({month, count}))
      .slice(-6); // Last 6 months
  };

  // Equipment status distribution
  const getEquipmentStatusData = () => {
    const statusCount: {[key: string]: number} = {};

    equipment.forEach((item) => {
      statusCount[item.Status] = (statusCount[item.Status] || 0) + 1;
    });

    return Object.entries(statusCount).map(([status, count]) => ({
      name: status,
      value: count,
    }));
  };

  const COLORS = {
    Available: "#000000",
    Borrowed: "#4B5563",
    Maintenance: "#D1D5DB",
  };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
//           <p className="text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-black}">
          Dashboard
        </h1>
        <div className="h-1 w-24 bg-black mt-4 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Borrowed */}
          <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                  Total Borrowed
                </p>
                <p className="text-4xl font-bold mt-2 text-black">
                  {stats.totalBorrowed}
                </p>
              </div>
              <div className="bg-black p-3 rounded-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          {/* Active Borrows */}
          <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                  Active Borrows
                </p>
                <p className="text-4xl font-bold mt-2 text-black">
                  {stats.activeBorrows}
                </p>
              </div>
              <div className="bg-black p-3 rounded-lg">
                <Package className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          {/* Returned */}
          <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                  Returned
                </p>
                <p className="text-4xl font-bold mt-2 text-black">
                  {stats.returned}
                </p>
              </div>
              <div className="bg-black p-3 rounded-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          {/* Overdue */}
          <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                  Overdue
                </p>
                <p className="text-4xl font-bold mt-2 text-black">
                  {stats.overdue}
                </p>
              </div>
              <div className="bg-black p-3 rounded-lg">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Lending Trend Chart */}
          <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5" />
              <h2 className="text-xl font-bold">Lending Activity</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getLendingTrendData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#000" />
                <YAxis stroke="#000" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "2px solid #000",
                    borderRadius: "0",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#000"
                  strokeWidth={3}
                  dot={{fill: "#000", r: 6}}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Equipment Status Chart */}
          <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-2 mb-6">
              <Package className="w-5 h-5" />
              <h2 className="text-xl font-bold">Equipment Status</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={getEquipmentStatusData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, value}) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="#000"
                  strokeWidth={2}
                >
                  {getEquipmentStatusData().map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[entry.name as keyof typeof COLORS] || "#999"}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "2px solid #000",
                    borderRadius: "0",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Lending Records Table */}
        <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="bg-black text-white px-6 py-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <h2 className="text-xl font-bold">Recent Lending Records</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-black">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-black uppercase tracking-wider">
                    Equipment
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-black uppercase tracking-wider">
                    Borrow Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-black uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-black uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-black uppercase tracking-wider">
                    Purpose
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y-2 divide-gray-200">
                {lendingRecords.slice(0, 5).map((record, index) => {
                  const isOverdue =
                    !record.ReturnDate &&
                    record.DueDate &&
                    new Date(record.DueDate) < new Date();

                  return (
                    <tr
                      key={record.ID || index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-black">
                          {record.EquipmentName || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {new Date(record.BorrowDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {record.DueDate
                          ? new Date(record.DueDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {record.ReturnDate ? (
                          <span className="inline-flex items-center px-3 py-1 text-xs font-bold text-white bg-black border-2 border-black">
                            RETURNED
                          </span>
                        ) : isOverdue ? (
                          <span className="inline-flex items-center px-3 py-1 text-xs font-bold text-black bg-white border-2 border-black">
                            OVERDUE
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 text-xs font-bold text-black bg-gray-200 border-2 border-black">
                            ACTIVE
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        <div className="max-w-xs truncate">
                          {record.Purpose || "N/A"}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {lendingRecords.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <BookOpen className="w-12 h-12 text-gray-300" />
                        <p className="text-lg font-medium">
                          No lending records yet
                        </p>
                        <p className="text-sm">
                          Start borrowing equipment to see your records here
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashBoard;
