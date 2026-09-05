"use client";

import { useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CreditCard,
  Download,
  LayoutDashboard,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Users,
  X,
} from "lucide-react";
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const employees = [
  {
    name: "Mahtab Khan",
    email: "mahtab.khan.demo@gmail.com",
    role: "Full Stack Developer",
    team: "Development",
    initials: "MK",
    color: "coral",
    status: "Present",
    hours: "38h 20m",
    attendance: 96,
  },
  {
    name: "Shivam Tiwari",
    email: "shivam.tiwari.demo@gmail.com",
    role: "Frontend Developer",
    team: "Development",
    initials: "ST",
    color: "blue",
    status: "Present",
    hours: "41h 05m",
    attendance: 92,
  },
  {
    name: "Dilip Yadav",
    email: "dilip.yadav.demo@gmail.com",
    role: "Growth Manager",
    team: "Marketing",
    initials: "DY",
    color: "green",
    status: "Late",
    hours: "34h 45m",
    attendance: 88,
  },
  {
    name: "Shozab Abbas",
    email: "shozab.abbas.demo@gmail.com",
    role: "Backend Developer",
    team: "Development",
    initials: "SA",
    color: "violet",
    status: "Present",
    hours: "39h 10m",
    attendance: 97,
    leaveReason: "Sick leave"
  },
  {
    name: "Abhishek Mishra",
    email: "abhishek.mishra.demo@gmail.com",
    role: "UX Researcher",
    team: "Design",
    initials: "AM",
    color: "yellow",
    status: "On leave",
    hours: "-",
    attendance: 84,
    leaveReason: "Annual leave",
  },
];

const activity = [
  {
    initials: "MK",
    color: "coral",
    text: "Mahtab Khan clocked in",
    time: "09:03",
    tag: "Present",
  },
  {
    initials: "ST",
    color: "blue",
    text: "Shivam Tiwari clocked in",
    time: "09:05",
    tag: "Present",
  },
  {
    initials: "DY",
    color: "green",
    text: "Dilip Yadav joined Marketing",
    time: "09:14",
    tag: "Update",
  },
  {
    initials: "SA",
    color: "violet",
    text: "Shozab Abbas left for break",
    time: "10:32",
    tag: "Update",
  },
  {
    initials: "AM",
    color: "yellow",
    text: "Abhishek Mishra is on leave",
    time: "11:15",
    tag: "Late",
  },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dayHours = ["450h", "430h", "440h", "410h", "460h", "100h", "90h"];
const dayOvertime = ["12h", "10h", "14h", "9h", "16h", "2h", "0h"];
const presentHours = [450, 430, 440, 410, 460, 100, 90];
const weeklyHours = days.map((day, index) => ({
  day,
  present: presentHours[index],
  overtime: [12, 10, 14, 9, 16, 2, 0][index],
}));

function WeeklyHoursChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const element = chartRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimationKey((key) => key + 1);
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="recharts-hours"
      ref={chartRef}
    >
      <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
        <LineChart
          key={animationKey}
          data={weeklyHours}
          margin={{ top: 8, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="weekly-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#58A6FF" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#58A6FF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#273246" strokeDasharray="2 3" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#9aa39f", fontSize: 10 }} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value}h`}
            domain={[0, 600]}
            ticks={[0, 150, 300, 450, 600]}
            tick={{ fill: "#8b98aa", fontSize: 10 }}
            width={38}
          />
          <Tooltip cursor={<CrosshairCursor />} content={<WeeklyTooltip />} />
          <Area type="natural" dataKey="present" stroke="#58A6FF" strokeOpacity={1} strokeWidth={3} fill="url(#weekly-fill)" fillOpacity={1} dot={false} activeDot={false} isAnimationActive animationDuration={1700} animationEasing="ease-out" />
          <Line
            type="natural"
            dataKey="present"
            stroke="#58A6FF"
            strokeOpacity={1}
            strokeWidth={3}
            dot={(props) => (
              <circle
                cx={props.cx}
                cy={props.cy}
                r={6}
                fill="#58A6FF"
                stroke="#0D1117"
                strokeWidth={2}
              />
            )}
            activeDot={false}
            isAnimationActive
            animationDuration={1700}
            animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function CrosshairCursor({
  points,
  y,
  height,
}: {
  points?: Array<{ x?: number; y?: number }>;
  y?: number;
  height?: number;
}) {
  const point = points?.[0];
  if (point?.x === undefined || point.y === undefined || y === undefined || height === undefined) return null;
  return (
    <g pointerEvents="none">
      <line x1={point.x} x2={point.x} y1={y + height} y2={point.y} stroke="#F8F1DF" strokeOpacity={0.7} strokeDasharray="4 4" />
      <circle cx={point.x} cy={point.y} r={8} fill="#58A6FF" fillOpacity={0.18} />
      <circle cx={point.x} cy={point.y} r={4} fill="#fff" stroke="#58A6FF" strokeWidth={2} />
    </g>
  );
}

function WeeklyTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value?: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="weekly-tooltip">
      <strong>{label}</strong>
      <span>hours : {payload[0].value}</span>
    </div>
  );
}

const attendanceWeeks = [
  { week: "W1", present: 24, absent: 1, onLeave: 2 },
  { week: "W2", present: 26, absent: 2, onLeave: 1 },
  { week: "W3", present: 25, absent: 1, onLeave: 2 },
  { week: "W4", present: 27, absent: 0, onLeave: 1 },
];
const teamOverview = [
  { name: "Development", members: 8, hours: "428h", overtime: "+12h", attendance: 96, color: "#58A6FF" },
  { name: "Design", members: 5, hours: "286h", overtime: "+6h", attendance: 94, color: "#67e8f9" },
  { name: "Marketing", members: 6, hours: "312h", overtime: "+4h", attendance: 92, color: "#4ADE80" },
];

function AttendanceChart() {
  return (
    <div className="attendance-chart">
      <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
        <BarChart data={attendanceWeeks} margin={{ top: 8, right: 8, left: -18, bottom: 0 }} barCategoryGap="18%" barGap={4}>
          <CartesianGrid vertical={false} stroke="#273246" strokeDasharray="2 3" />
          <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: "#8b98aa", fontSize: 10 }} />
          <YAxis domain={[0, 35]} ticks={[0, 7, 14, 21, 28, 35]} axisLine={false} tickLine={false} tick={{ fill: "#8b98aa", fontSize: 9 }} />
          <Tooltip contentStyle={{ border: "1px solid #273246", background: "#141B29", borderRadius: 6, color: "#fff", fontFamily: "monospace", fontSize: 10 }} />
          <Bar dataKey="present" fill="#4ADE80" radius={[5, 5, 0, 0]} barSize={24} />
          <Bar dataKey="absent" fill="#F87171" radius={[3, 3, 0, 0]} barSize={10} />
          <Bar dataKey="onLeave" name="On leave" fill="#F59E0B" radius={[3, 3, 0, 0]} barSize={10} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const attendanceRateData = [
  { month: "Jan", rate: 95 },
  { month: "Feb", rate: 90 },
  { month: "Mar", rate: 92 },
  { month: "Apr", rate: 88 },
  { month: "May", rate: 91 },
  { month: "Jun", rate: 94 },
  { month: "Jul", rate: 89 },
  { month: "Aug", rate: 96 },
];

function AttendanceRateChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const element = chartRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setAnimationKey((key) => key + 1);
      else setActiveIndex(null);
    }, { threshold: 0.35 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="rate-recharts" ref={chartRef}>
      <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
        <LineChart
          key={animationKey}
          data={attendanceRateData}
          margin={{ top: 12, right: 12, left: 0, bottom: 0 }}
          onMouseMove={(state: { activeTooltipIndex?: number | string | null; isTooltipActive?: boolean }) => {
            if (state.isTooltipActive && typeof state.activeTooltipIndex === "number") setActiveIndex(state.activeTooltipIndex);
          }}
          onClick={(state: { activeTooltipIndex?: number | string | null }) => {
            if (typeof state.activeTooltipIndex === "number") setActiveIndex(state.activeTooltipIndex);
          }}
        >
          <defs>
            <linearGradient id="attendance-rate-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#58A6FF" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#58A6FF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="rgba(255,255,255,.08)" strokeDasharray="3 4" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#8B949E", fontSize: 9 }} />
          <YAxis domain={[80, 100]} ticks={[80, 85, 90, 95, 100]} tickFormatter={(value) => `${value}%`} axisLine={false} tickLine={false} tick={{ fill: "#8B949E", fontSize: 9 }} width={35} />
          <Tooltip cursor={<CrosshairCursor />} content={<AttendanceRateTooltip />} active={activeIndex !== null} />
          <Area
            type="natural"
            dataKey="rate"
            stroke="#58A6FF"
            strokeWidth={3}
            fill="url(#attendance-rate-fill)"
            dot={false}
            isAnimationActive
            animationDuration={1700}
            animationEasing="ease-out"
          />
          <Line
            type="natural"
            dataKey="rate"
            stroke="#58A6FF"
            strokeWidth={3}
            dot={(props) => (
              <AttendanceRateDot
                {...props}
                selected={activeIndex === props.index}
                onSelect={() => {
                  if (typeof props.index === "number") setActiveIndex(props.index);
                }}
              />
            )}
            activeDot={false}
            isAnimationActive
            animationDuration={1700}
            animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function AttendanceRateDot({
  cx,
  cy,
  payload,
  selected,
  onSelect,
}: {
  cx?: number;
  cy?: number;
  payload?: { rate?: number };
  selected?: boolean;
  onSelect?: () => void;
}) {
  if (cx === undefined || cy === undefined) return null;
  return (
    <g className={`attendance-rate-dot ${selected ? "selected" : ""}`} onClick={onSelect} role="button" tabIndex={0}>
      {selected && <><rect x={cx - 18} y={cy - 31} width={36} height={18} rx={8} /><text x={cx} y={cy - 19} textAnchor="middle">{payload?.rate}%</text></>}
      <circle cx={cx} cy={cy} r={selected ? 8 : 6} />
    </g>
  );
}

function AttendanceRateTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value?: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return <div className="weekly-tooltip"><strong>{label} attendance</strong><span>rate : {payload[0].value}%</span></div>;
}
const discussionMessages = [
  {
    initials: "MK",
    color: "coral",
    name: "Mahtab Khan",
    time: "09:26 AM",
    text: "Good morning team! The new attendance overview is looking great. Can we review the weekly hours flow today?",
    reactions: "3",
  },
  {
    initials: "ST",
    color: "blue",
    name: "Shivam Tiwari",
    time: "09:29 AM",
    text: "Absolutely. I have added the latest frontend updates and will share the preview in a few minutes.",
    reactions: "2",
  },
  {
    initials: "DY",
    color: "green",
    name: "Dilip Yadav",
    time: "09:34 AM",
    text: "I will bring the marketing team status to our afternoon sync. Also, welcome to the new week!",
    reactions: "1",
  },
];

function TeamChat() {
  const [channel, setChannel] = useState("general");
  const [message, setMessage] = useState("");
  const channelName =
    channel === "general"
      ? "General"
      : channel[0].toUpperCase() + channel.slice(1);
  return (
    <section className="chat-page">
      <div className="chat-intro">
        <div>
          <p className="eyebrow">Team communication</p>
          <h1>Team discussions</h1>
          <p className="subtitle">
            Keep your team aligned, one conversation at a time.
          </p>
        </div>
        <button className="add-button">
          <Plus size={17} /> New discussion
        </button>
      </div>
      <div className="chat-layout">
        <aside className="channel-list">
          <div className="channel-heading">
            <strong>Channels</strong>
            <button aria-label="Add channel">
              <Plus size={16} />
            </button>
          </div>
          {[
            ["general", "General", "Company-wide conversations", 8],
            ["development", "Development", "Build, bugs, and releases", 12],
            ["design", "Design", "Ideas, reviews, and research", 5],
          ].map(([id, title, description, count]) => (
            <button
              key={id as string}
              className={`channel-item ${channel === id ? "selected" : ""}`}
              onClick={() => setChannel(id as string)}
            >
              <span className="channel-hash">#</span>
              <span>
                <strong>{title}</strong>
                <small>{description}</small>
              </span>
              <b>{count}</b>
            </button>
          ))}
          <div className="chat-members">
            <span className="live-label">
              <i /> 6 members online
            </span>
            <div className="member-stack">
              <div className="avatar avatar-coral">MK</div>
              <div className="avatar avatar-blue">ST</div>
              <div className="avatar avatar-green">DY</div>
              <div className="avatar avatar-violet">SA</div>
            </div>
          </div>
        </aside>
        <section className="discussion-panel">
          <div className="discussion-header">
            <div>
              <h2># {channelName}</h2>
              <p>Team discussion and daily updates</p>
            </div>
            <button className="more-button" aria-label="Discussion options">
              <MoreHorizontal size={19} />
            </button>
          </div>
          <div className="messages">
            {discussionMessages.map((item) => (
              <article className="message" key={item.name}>
                <div className={`avatar avatar-${item.color}`}>
                  {item.initials}
                </div>
                <div className="message-body">
                  <div className="message-meta">
                    <strong>{item.name}</strong>
                    <span>{item.time}</span>
                  </div>
                  <p>{item.text}</p>
                  <button
                    className="reaction"
                    onClick={() => setMessage(message)}
                  >
                    ♡ {item.reactions}
                  </button>
                </div>
              </article>
            ))}
          </div>
          <form
            className="composer"
            onSubmit={(event) => {
              event.preventDefault();
              setMessage("");
            }}
          >
            <div className="avatar avatar-coral">RK</div>
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={`Message #${channel}`}
            />
            <button type="submit" aria-label="Send message">
              <ArrowUpRight size={17} />
            </button>
          </form>
        </section>
      </div>
    </section>
  );
}

function TeamMembers({
  onStartDiscussion,
  query,
}: {
  onStartDiscussion: () => void;
  query: string;
}) {
  const filteredEmployees = employees.filter((employee) =>
    `${employee.name} ${employee.email} ${employee.role} ${employee.team}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <section className="members-page">
      <div className="members-intro">
        <div>
          <p className="eyebrow">ACME Corp directory</p>
          <h1>Team members</h1>
          <p className="subtitle">Everyone on your team, all in one place.</p>
        </div>
        <button className="add-button" onClick={onStartDiscussion}>
          <Plus size={17} /> Add member
        </button>
      </div>
      <div className="member-directory">
        {filteredEmployees.map((employee) => (
          <article className="directory-card" key={employee.name}>
            <div className="directory-top">
              <div
                className={`avatar avatar-${employee.color} directory-avatar`}
              >
                {employee.initials}
              </div>
              <span
                className={`pill pill-${employee.status.toLowerCase().replace(" ", "-")}`}
              >
                {employee.status}
              </span>
            </div>
            <h2>{employee.name}</h2>
            <p>{employee.role}</p>
            <span className="directory-email">{employee.email}</span>
            <div className="directory-team">
              <span>{employee.team}</span>
              <strong>{employee.attendance}% attendance</strong>
            </div>
            <div className="directory-stats">
              <span>
                <small>Weekly hours</small>
                <b>{employee.hours}</b>
              </span>
              <span>
                <small>Member since</small>
                <b>Jan 2024</b>
              </span>
            </div>
            <button className="directory-action" onClick={onStartDiscussion}>
              <MessageSquare size={15} /> Start discussion
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function EmployeeDirectory() {
  const [department, setDepartment] = useState("All");
  const filtered = employees.filter(
    (employee) =>
      [
        "Mahtab Khan",
        "Shivam Tiwari",
        "Dilip Yadav",
        "Shozab Abbas",
        "Abhishek Mishra",
      ].includes(employee.name) &&
      (department === "All" || employee.team === department),
  );
  return (
    <section className="employees-page">
      <div className="employees-page-head">
        <div>
          <p className="eyebrow">Workspace directory</p>
          <h1>Employees</h1>
          <p className="subtitle">5 total · 4 active</p>
        </div>
        <button className="add-button">
          <Plus size={17} /> Invite Employee
        </button>
      </div>
      <div className="employee-filters">
        {["All", "Development", "Design", "Marketing", "HR"].map((item) => (
          <button
            key={item}
            className={department === item ? "filter-active" : ""}
            onClick={() => setDepartment(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <section className="employee-table">
        <div className="employee-table-head">
          <span>Employee</span>
          <span>Department</span>
          <span>Role</span>
          <span>Joined</span>
          <span>Status</span>
        </div>
        {filtered.map((employee) => (
          <div className="employee-table-row" key={employee.email}>
            <div className="employee-identity">
              <div className={`avatar avatar-${employee.color}`}>
                {employee.initials}
              </div>
              <div>
                <strong>{employee.name}</strong>
                <small>{employee.email}</small>
              </div>
            </div>
            <span>{employee.team}</span>
            <span>{employee.role}</span>
            <span>Jan 2024</span>
            <span
              className="employee-status status-active"
            >
              Active
            </span>
          </div>
        ))}
      </section>
    </section>
  );
}

function AttendancePage() {
  const attendanceRows = [
    {
      name: "Sarah Mitchell",
      initials: "SM",
      color: "coral",
      status: "Present",
      checkIn: "08:47 AM",
      hours: "8h 12m",
    },
    {
      name: "Michael Torres",
      initials: "MT",
      color: "blue",
      status: "Present",
      checkIn: "08:55 AM",
      hours: "7h 58m",
    },
    {
      name: "Emma Wilson",
      initials: "EW",
      color: "yellow",
      status: "Present",
      checkIn: "09:02 AM",
      hours: "7h 41m",
    },
    {
      name: "David Park",
      initials: "DP",
      color: "violet",
      status: "Late",
      checkIn: "10:32 AM",
      hours: "6h 18m",
    },
    {
      name: "Lisa Chen",
      initials: "LC",
      color: "green",
      status: "On leave",
      checkIn: "-",
      hours: "-",
    },
    {
      name: "Tom Harris",
      initials: "TH",
      color: "blue",
      status: "Absent",
      checkIn: "-",
      hours: "-",
    },
  ];
  return (
    <section className="attendance-page">
      <div className="attendance-page-head">
        <div>
          <p className="eyebrow">Daily workforce status</p>
          <h1>Attendance</h1>
          <p className="subtitle">Thursday, September 3, 2026</p>
        </div>
        <button className="date-button">
          <CalendarDays size={17} /> August 2026 <ChevronDown size={15} />
        </button>
      </div>
      <div className="attendance-kpis">
        <div>
          <span>Present</span>
          <strong>22</strong>
          <small>86% of team</small>
        </div>
        <div>
          <span>Absent</span>
          <strong>3</strong>
          <small>Needs attention</small>
        </div>
        <div>
          <span>On leave</span>
          <strong>1</strong>
          <small>Approved leave</small>
        </div>
        <div>
          <span>Late</span>
          <strong>2</strong>
          <small>Today</small>
        </div>
      </div>
      <section className="attendance-calendar panel">
        <div className="panel-header">
          <div>
            <h2>September overview</h2>
            <p>Attendance by week</p>
          </div>
          <div className="calendar-nav">
            <button aria-label="Previous month">
              <ChevronLeft size={16} />
            </button>
            <strong>Sep 2026</strong>
            <button aria-label="Next month">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <div className="attendance-weeks">
          <span>W1</span>
          <i className="week-present">Present: 3</i>
          <i className="week-late">Late: 1</i>
          <i className="week-absent">Absent: 0</i>
          <span>W2</span>
          <i className="week-present">Present: 5</i>
          <i className="week-late">Late: 0</i>
          <i className="week-absent">Absent: 1</i>
          <span>W3</span>
          <i className="week-present">Present: 5</i>
          <i className="week-late">Late: 1</i>
          <i className="week-absent">Absent: 1</i>
          <span>W4</span>
          <i className="week-present">Present: 9</i>
          <i className="week-late">Late: 0</i>
          <i className="week-absent">Absent: 1</i>
        </div>
      </section>
      <section className="attendance-table panel">
        <div className="panel-header">
          <div>
            <h2>Today&apos;s attendance</h2>
            <p>All employees and their current status</p>
          </div>
          <button className="add-button">
            <Plus size={17} /> Export
          </button>
        </div>
        <div className="attendance-table-head">
          <span>Employee</span>
          <span>Status</span>
          <span>Clock in</span>
          <span>Total hours</span>
        </div>
        {attendanceRows.map((row) => (
          <div className="attendance-table-row" key={row.name}>
            <div className="employee-identity">
              <div className={`avatar avatar-${row.color}`}>{row.initials}</div>
              <strong>{row.name}</strong>
            </div>
            <span
              className={`employee-status status-${row.status.toLowerCase().replace(" ", "-")}`}
            >
              {row.status}
            </span>
            <span>{row.checkIn}</span>
            <span>{row.hours}</span>
          </div>
        ))}
      </section>
    </section>
  );
}

function ReportsPage() {
  const rows = [
    [
      "Sarah Mitchell",
      "Development",
      "22",
      "21",
      "0",
      "1",
      "185h 20m",
      "5h 30m",
    ],
    [
      "Michael Torres",
      "Development",
      "22",
      "20",
      "1",
      "1",
      "172h 00m",
      "2h 00m",
    ],
    ["Emma Wilson", "Design", "22", "22", "0", "0", "176h 00m", "0h 00m"],
    ["David Park", "Marketing", "22", "19", "2", "1", "155h 30m", "0h 00m"],
    ["Lisa Chen", "HR", "22", "22", "0", "0", "176h 00m", "1h 20m"],
  ];
  return (
    <section className="reports-page">
      <div className="reports-head">
        <div>
          <p className="eyebrow">ACME Corp · monthly analytics</p>
          <h1>Reports</h1>
          <p className="subtitle">August 2026 · ACME Corp</p>
        </div>
        <button className="add-button">
          <ArrowUpRight size={17} /> Export CSV
        </button>
      </div>
      <div className="reports-charts">
        <section className="panel report-chart">
          <div className="panel-header">
            <div>
              <h2>Monthly working hours</h2>
              <p>Team totals by month</p>
            </div>
            <span className="report-value">1,580h</span>
          </div>
          <div className="report-bars">
            {[42, 52, 48, 63, 69, 76, 84, 96].map((height, index) => (
              <div className="report-bar-column" key={index}>
                <span style={{ height: `${height}%` }} />
                <b>
                  {
                    ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"][
                      index
                    ]
                  }
                </b>
              </div>
            ))}
          </div>
          <div className="report-scale">
            <span>0</span>
            <span>1,500</span>
            <span>3,000</span>
            <span>4,500</span>
            <span>6,000</span>
          </div>
        </section>
        <section className="panel report-chart">
          <div className="panel-header">
            <div>
              <h2>Attendance rate (%)</h2>
              <p>Team attendance trend</p>
            </div>
            <span className="report-value">96%</span>
          </div>
          <AttendanceRateChart />
        </section>
      </div>
      <section className="panel employee-report">
        <div className="panel-header">
          <div>
            <h2>Employee report - August 2026</h2>
            <p>Detailed attendance and working hours</p>
          </div>
          <button className="add-button">
            <ArrowUpRight size={16} /> Export CSV
          </button>
        </div>
        <div className="employee-report-head">
          <span>Employee</span>
          <span>Dept.</span>
          <span>Working days</span>
          <span>Present</span>
          <span>Absent</span>
          <span>Late</span>
          <span>Total hours</span>
          <span>Overtime</span>
        </div>
        {rows.map((row) => (
          <div className="employee-report-row" key={row[0]}>
            {row.map((value, index) => (
              <span
                className={index === 0 ? "report-employee-name" : ""}
                key={`${row[0]}-${index}`}
              >
                {value}
              </span>
            ))}
          </div>
        ))}
      </section>
    </section>
  );
}

function BillingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const plans = [
    {
      name: "Starter",
      description: "Core chat + attendance + reports",
      monthly: "$4",
      limit: "Up to 15 employees",
      features: ["Chat & direct messages", "Attendance tracking", "Monthly reports", "Email support"],
    },
    {
      name: "Business",
      description: "Advanced teams, reports and controls",
      monthly: "$9",
      limit: "Up to 100 employees",
      features: ["Everything in Starter", "Group channels", "Advanced reports", "Export PDF/CSV", "Priority support"],
      current: true,
    },
    {
      name: "Enterprise",
      description: "Custom limits, advanced security",
      monthly: "$18",
      limit: "Unlimited employees",
      features: ["Everything in Business", "SSO & advanced permissions", "Custom integrations", "Audit logs", "Dedicated support"],
    },
  ];
  const invoices = [
    ["Jul 1, 2026", "Business · 28 employees", "$252.00"],
    ["Jun 1, 2026", "Business · 28 employees", "$252.00"],
    ["May 1, 2026", "Business · 25 employees", "$225.00"],
    ["Apr 1, 2026", "Business · 25 employees", "$225.00"],
  ];

  return (
    <section className="billing-page">
      <div className="billing-head">
        <div>
          <p className="eyebrow">Workspace subscription</p>
          <h1>Billing</h1>
          <p className="subtitle">Manage your subscription and usage</p>
        </div>
        <div className="billing-cycle" role="group" aria-label="Billing cycle">
          <button className={billingCycle === "monthly" ? "cycle-active" : ""} onClick={() => setBillingCycle("monthly")}>Monthly</button>
          <button className={billingCycle === "yearly" ? "cycle-active" : ""} onClick={() => setBillingCycle("yearly")}>Yearly <span>Save 17%</span></button>
        </div>
      </div>

      <section className="billing-overview">
        <div className="current-plan panel">
          <div className="billing-section-label"><CreditCard size={15} /> Current plan</div>
          <div className="current-plan-main">
            <div>
              <h2>Business <span>Active</span></h2>
              <p>Advanced teams, reports and controls</p>
              <strong>$9<small>/employee/mo</small></strong>
            </div>
            <div className="billing-total"><strong>$252</strong><span>per month</span></div>
          </div>
          <div className="billing-renewal"><span>28 of 100 employees</span><span>Next billing Sep 1, 2026</span></div>
        </div>
        <div className="usage-panel panel">
          <div className="billing-section-label">Usage this cycle</div>
          <div className="usage-item"><div><span>Employees used</span><strong>28 <small>of 100</small></strong></div><div className="usage-bar"><i style={{ width: "28%" }} /></div></div>
          <div className="usage-item"><div><span>Storage used</span><strong>4.2 GB <small>of 50 GB</small></strong></div><div className="usage-bar"><i className="storage" style={{ width: "8.4%" }} /></div></div>
          <div className="usage-item usage-messages"><div><span>Messages this month</span><strong>12,840 <small>Unlimited</small></strong></div><span className="unlimited">Unlimited</span></div>
        </div>
      </section>

      <div className="billing-section-heading"><div><h2>Choose a plan</h2><p>Scale your workspace as your team grows.</p></div></div>
      <div className="plan-grid">
        {plans.map((plan) => (
          <article className={`plan-card panel ${plan.current ? "plan-current" : ""}`} key={plan.name}>
            {plan.current && <div className="plan-badge">Current plan</div>}
            <h3>{plan.name}</h3><p className="plan-description">{plan.description}</p>
            <div className="plan-price">{billingCycle === "yearly" ? plan.monthly : plan.monthly}<small>/employee/mo</small></div>
            <div className="plan-limit">{plan.limit}</div>
            <ul>{plan.features.map((feature) => <li key={feature}><Check size={14} />{feature}</li>)}</ul>
            <button className={plan.current ? "plan-button current-button" : "plan-button"}>{plan.current ? "Current Plan" : "Switch Plan"}</button>
          </article>
        ))}
      </div>

      <section className="invoice-panel panel">
        <div className="panel-header"><div><h2>Invoice history</h2><p>Your recent payments and downloadable invoices</p></div></div>
        <div className="invoice-head"><span>Date</span><span>Description</span><span>Amount</span><span>Status</span><span /></div>
        {invoices.map(([date, description, amount]) => <div className="invoice-row" key={date}><span>{date}</span><span>{description}</span><strong>{amount}</strong><span className="paid-status">Paid</span><button aria-label={`Download invoice from ${date}`}><Download size={15} /> Download</button></div>)}
      </section>
    </section>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [team, setTeam] = useState("All teams");
  const [weekOffset, setWeekOffset] = useState(0);
  const [clockInTime, setClockInTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("2026-09-03");
  const [showWelcome, setShowWelcome] = useState(true);
  const [welcomePhase, setWelcomePhase] = useState<"hello" | "day">("hello");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const calendarInputRef = useRef<HTMLInputElement>(null);
  const selectedDay = 4;
  const weekLabel =
    weekOffset === 0
      ? "Aug 31 - Sep 6, 2026"
      : weekOffset < 0
        ? "Aug 24 - Aug 30, 2026"
        : "Sep 7 - Sep 13, 2026";

  useEffect(() => {
    const dayTimer = window.setTimeout(() => setWelcomePhase("day"), 1800);
    const welcomeTimer = window.setTimeout(() => setShowWelcome(false), 5000);
    return () => {
      window.clearTimeout(dayTimer);
      window.clearTimeout(welcomeTimer);
    };
  }, []);

  return (
    <main className="app-shell">
      {showWelcome && (
        <div className="welcome-screen" aria-label="Welcome, MK">
          <div className="welcome-mark">W</div>
          <p>Welcome back</p>
          <h1 key={welcomePhase}>
            {welcomePhase === "hello" ? <><span>Hello,</span> MK</> : <>Have a <span>wonderful day</span></>}
          </h1>
          <i />
        </div>
      )}
      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">W</div>
          <div><span>WorkSpace</span><small>ACME Corp</small></div>
        </div>
        <div className="workspace-switcher">
          <div className="workspace-avatar">AC</div>
          <div>
            <small>WORKSPACE</small>
            <strong>ACME Corp</strong>
          </div>
          <ChevronDown size={15} />
        </div>
        <nav className="main-nav">
          <p className="nav-label">Workspace</p>
          {[
            { label: "Overview", icon: LayoutDashboard },
            { label: "Attendance", icon: CalendarDays },
            { label: "Employees", icon: Users },
            { label: "Team chat", icon: MessageSquare },
            { label: "Reports", icon: Activity },
            { label: "Billing", icon: Clock3 },
          ].map(({ label, icon: Icon }) => (
            <button
              className={`nav-item ${activeTab === label ? "active" : ""}`}
              key={label}
              onClick={() => {
                setActiveTab(label);
                setMenuOpen(false);
              }}
            >
              <Icon size={18} />
              <span>{label}</span>
              {label === "Team chat" && <b className="unread">3</b>}
            </button>
          ))}
          <p className="nav-label nav-label-spaced">Manage</p>
          <button className="nav-item" onClick={() => setActiveTab("Settings")}>
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">?</div>
            <div>
              <strong>Need a hand?</strong>
              <span>Visit our Help Center</span>
            </div>
            <ArrowUpRight size={16} />
          </div>
          <div className="profile">
            <div className="avatar avatar-blue">JD</div>
            <div>
              <strong>Mahtab Khan</strong>
              <span>Admin</span>
            </div>
            <MoreHorizontal size={18} />
          </div>
        </div>
      </aside>
      <section className="content">
        <header className="topbar">
          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <div className="breadcrumb">
            <span>Workspace</span>
            <b>/</b>
            <strong>{activeTab}</strong>
          </div>
          <div className="top-actions">
            <div className="search">
              <Search size={17} />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search anything"
                aria-label="Search team"
              />
            </div>
            <button className="icon-button" aria-label="Notifications">
              <Bell size={19} />
              <i />
            </button>
            <button
              className="add-button"
              onClick={() => setActiveTab("Team members")}
            >
              <Plus size={17} /> Add new
            </button>
          </div>
        </header>
        <div
          className={`page-content ${activeTab === "Team chat" || activeTab === "Team members" || activeTab === "Employees" || activeTab === "Attendance" || activeTab === "Reports" || activeTab === "Billing" ? "chat-active" : ""}`}
        >
          {activeTab === "Team chat" && <TeamChat />}
          {activeTab === "Team members" && (
            <TeamMembers
              query={searchTerm}
              onStartDiscussion={() => setActiveTab("Team chat")}
            />
          )}
          {activeTab === "Employees" && <EmployeeDirectory />}
          {activeTab === "Attendance" && <AttendancePage />}
          {activeTab === "Reports" && <ReportsPage />}
          {activeTab === "Billing" && <BillingPage />}
          <div className="page-heading">
            <div>
              <p className="eyebrow">Thursday, September 3, 2026</p>
              <h1>
                Good morning, Mahtab <span>👋</span>
              </h1>
              <p className="subtitle">
                {clockInTime ? `Clocked in at ${clockInTime}` : "Not clocked in"}
              </p>
            </div>
            <div className="heading-actions">
              <button
                className={`clock-button ${clockInTime ? "clocked-in" : ""}`}
                onClick={() => {
                  if (!clockInTime) {
                    setClockInTime(new Intl.DateTimeFormat("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date()));
                  }
                }}
                disabled={Boolean(clockInTime)}
              >
                <Clock3 size={17} /> {clockInTime ? "Clocked In" : "Clock In"}
              </button>
              <button
                className="date-button"
                onClick={() => calendarInputRef.current?.showPicker()}
              >
                <CalendarDays size={17} /> September 2026{" "}
                <ChevronDown size={15} />
              </button>
              <input
                ref={calendarInputRef}
                className="calendar-input"
                type="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                aria-label="Choose a calendar date"
              />
            </div>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-top">
                <span>Total Employees</span>
                <Users size={18} />
              </div>
              <strong>28</strong>
              <p className="positive">
                +2 <em>this month</em>
              </p>
            </div>
            <div className="stat-card">
              <div className="stat-top">
                <span>Present Today</span>
                <span className="status-dot green-dot" />
              </div>
              <strong>24</strong>
              <p className="positive">
                86% <em>attendance</em>
              </p>
            </div>
            <div className="stat-card">
              <div className="stat-top">
                <span>Absent Today</span>
                <span className="status-dot red-dot" />
              </div>
              <strong>3</strong>
              <p className="warning">
                1 <em>on leave</em>
              </p>
            </div>
            <div className="stat-card">
              <div className="stat-top">
                <span>Total Hours (Week)</span>
                <Clock3 size={18} />
              </div>
              <strong>
                1,580<span className="unit">h</span>
              </strong>
              <p className="positive">
                +34h <em>overtime</em>
              </p>
            </div>
          </div>
          <div className="dashboard-grid">
            <section className="panel hours-panel">
              <div className="panel-header">
                <div>
                  <h2>Weekly hours</h2>
                  <p>Team activity across the week</p>
                </div>
                <div className="week-picker">
                  <button
                    onClick={() => setWeekOffset(weekOffset - 1)}
                    aria-label="Previous week"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span>{weekLabel}</span>
                  <button
                    onClick={() => setWeekOffset(weekOffset + 1)}
                    aria-label="Next week"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
              <div className="chart-legend">
                <span>
                  <i className="legend-present" /> Present hours
                </span>
              </div>
              <div className="recharts-bar-chart">
                <WeeklyHoursChart />
              </div>
              <div className="chart-footer">
                <span>
                  <b>{dayHours[selectedDay]}</b> on {days[selectedDay]}
                </span>
                <span>
                  <b>{dayOvertime[selectedDay]}</b> overtime
                </span>
                <span className="chart-note">
                  {days[selectedDay]} was your most active day
                </span>
              </div>
            </section>
            <section className="panel attendance-panel">
              <div className="panel-header">
                <div>
                  <h2>Attendance (August)</h2>
                  <p>August 2026</p>
                </div>
                <button
                  className="more-button"
                  aria-label="More attendance options"
                >
                  <MoreHorizontal size={19} />
                </button>
              </div>
              <div className="chart-legend attendance-legend">
                <span><i className="legend-attendance-present" /> Present</span>
                <span><i className="legend-attendance-absent" /> Absent</span>
                <span><i className="legend-attendance-late" /> On leave</span>
              </div>
              <AttendanceChart />
              <div className="attendance-foot">
                <span>Last updated</span>
                <b>Today, 9:24 AM</b>
              </div>
            </section>
          </div>
          <div className="lower-grid">
            <section className="panel team-panel">
              <div className="panel-header">
                <div>
                  <h2>Team overview</h2>
                  <p>See how everyone is doing</p>
                </div>
                <div className="team-controls">
                  <select
                    value={team}
                    onChange={(event) => setTeam(event.target.value)}
                    aria-label="Filter by team"
                  >
                    <option>All teams</option>
                    <option>Development</option>
                    <option>Design</option>
                    <option>Marketing</option>
                  </select>
                  <button
                    className="more-button"
                    aria-label="More team options"
                  >
                    <MoreHorizontal size={19} />
                  </button>
                </div>
              </div>
              <div className="team-table">
                <div className="table-head">
                  <span>Team</span>
                  <span>Members</span>
                  <span>Hours</span>
                  <span>Overtime</span>
                  <span>Attendance</span>
                </div>
                {teamOverview.map((teamItem) => (
                  <div className="member-row" key={teamItem.name}>
                    <div className="member-name"><i className="team-color-dot" style={{ background: teamItem.color }} /><strong>{teamItem.name}</strong></div>
                    <span className="team-name">{teamItem.members}</span>
                    <span className="hours">{teamItem.hours}</span>
                    <span className="overtime-value">{teamItem.overtime}</span>
                    <div className="attendance-cell"><div className="progress"><i style={{ width: `${teamItem.attendance}%`, background: teamItem.color }} /></div><span>{teamItem.attendance}%</span></div>
                  </div>
                ))}
              </div>
              <button className="view-all" onClick={() => setShowAll(!showAll)}>
                {showAll ? "Show less" : "View all members"}{" "}
                <ArrowUpRight size={15} />
              </button>
            </section>
            <section className="panel activity-panel">
              <div className="panel-header">
                <div>
                  <h2>Live activity</h2>
                  <p>What&apos;s happening right now</p>
                </div>
                <span className="live-label">
                  <i /> Live
                </span>
              </div>
              <div className="activity-list">
                {activity.map((item) => (
                  <div className="activity-item" key={item.text}>
                    <div className={`avatar avatar-${item.color}`}>
                      {item.initials}
                    </div>
                    <div className="activity-copy">
                      <strong>{item.text}</strong>
                      <span>{item.time}</span>
                    </div>
                    <span
                      className={`activity-tag tag-${item.tag.toLowerCase()}`}
                    >
                      {item.tag}
                    </span>
                  </div>
                ))}
              </div>
              <button className="view-all">
                View activity log <ArrowUpRight size={15} />
              </button>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
