export interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  content: Section[];
}

export interface Section {
  type: 'heading' | 'paragraph' | 'list' | 'table' | 'callout' | 'code';
  level?: 1 | 2 | 3;
  content?: string;
  items?: string[];
  calloutType?: 'info' | 'warning' | 'tip';
  tableData?: { headers: string[]; rows: string[][] };
}

export const bookInfo = {
  title: "Physical AI & Humanoid Robotics",
  subtitle: "A Comprehensive Textbook",
  edition: "First Edition",
  theme: "AI Systems in the Physical World • Embodied Intelligence",
  authors: ["Panaversity"],
  description: "Bridging the gap between the digital brain and the physical body. Learn to design, simulate, and deploy humanoid robots capable of natural human interactions.",
};

export const chapters: Chapter[] = [
  {
    id: "introduction",
    number: 1,
    title: "Introduction to Physical AI",
    subtitle: "Foundations of Embodied Intelligence",
    content: [
      { type: 'heading', level: 1, content: "Focus and Theme: AI Systems in the Physical World" },
      { type: 'paragraph', content: "The future of AI extends beyond digital spaces into the physical world. This capstone quarter introduces Physical AI—AI systems that function in reality and comprehend physical laws." },
      { type: 'paragraph', content: "Goal: Bridging the gap between the digital brain and the physical body. Students apply their AI knowledge to control Humanoid Robots in simulated and real-world environments." },
      { type: 'heading', level: 2, content: "Why Physical AI Matters" },
      { type: 'paragraph', content: "Humanoid robots are poised to excel in our human-centered world because they share our physical form and can be trained with abundant data from interacting in environments designed for humans." },
      { type: 'paragraph', content: "The future of work will be a partnership between people, intelligent agents (AI software), and robots. This shift won't necessarily eliminate jobs but will change what humans do, leading to a massive demand for new skills." },
      { type: 'heading', level: 2, content: "Learning Outcomes" },
      { type: 'list', items: [
        "Understand Physical AI principles and embodied intelligence",
        "Master ROS 2 (Robot Operating System) for robotic control",
        "Simulate robots with Gazebo and Unity",
        "Develop with NVIDIA Isaac AI robot platform",
        "Design humanoid robots for natural interactions",
        "Integrate GPT models for conversational robotics"
      ]},
    ]
  },
  {
    id: "module-1",
    number: 2,
    title: "The Robotic Nervous System",
    subtitle: "ROS 2 Fundamentals",
    content: [
      { type: 'heading', level: 1, content: "Module 1: ROS 2 - The Robotic Nervous System" },
      { type: 'paragraph', content: "Focus: Middleware for robot control. ROS 2 (Robot Operating System 2) provides the communication infrastructure that allows different parts of a robot to work together seamlessly." },
      { type: 'heading', level: 2, content: "Core Concepts" },
      { type: 'list', items: [
        "ROS 2 Nodes, Topics, and Services",
        "Bridging Python Agents to ROS controllers using rclpy",
        "Understanding URDF (Unified Robot Description Format) for humanoids"
      ]},
      { type: 'heading', level: 2, content: "Weekly Breakdown: Weeks 3-5" },
      { type: 'callout', calloutType: 'info', content: "ROS 2 architecture and core concepts form the foundation of all modern robotics development." },
      { type: 'list', items: [
        "ROS 2 architecture and core concepts",
        "Nodes, topics, services, and actions",
        "Building ROS 2 packages with Python",
        "Launch files and parameter management"
      ]},
    ]
  },
  {
    id: "module-2",
    number: 3,
    title: "The Digital Twin",
    subtitle: "Gazebo & Unity Simulation",
    content: [
      { type: 'heading', level: 1, content: "Module 2: The Digital Twin - Gazebo & Unity" },
      { type: 'paragraph', content: "Focus: Physics simulation and environment building. Before deploying to real hardware, we create virtual replicas of our robots and their environments." },
      { type: 'heading', level: 2, content: "Key Topics" },
      { type: 'list', items: [
        "Simulating physics, gravity, and collisions in Gazebo",
        "High-fidelity rendering and human-robot interaction in Unity",
        "Simulating sensors: LiDAR, Depth Cameras, and IMUs"
      ]},
      { type: 'heading', level: 2, content: "Weekly Breakdown: Weeks 6-7" },
      { type: 'list', items: [
        "Gazebo simulation environment setup",
        "URDF and SDF robot description formats",
        "Physics simulation and sensor simulation",
        "Introduction to Unity for robot visualization"
      ]},
      { type: 'callout', calloutType: 'tip', content: "Digital twins allow for safe experimentation and rapid iteration before committing to expensive hardware tests." },
    ]
  },
  {
    id: "module-3",
    number: 4,
    title: "The AI-Robot Brain",
    subtitle: "NVIDIA Isaac Platform",
    content: [
      { type: 'heading', level: 1, content: "Module 3: The AI-Robot Brain - NVIDIA Isaac™" },
      { type: 'paragraph', content: "Focus: Advanced perception and training. NVIDIA Isaac provides the computational horsepower needed for real-time AI in robotics applications." },
      { type: 'heading', level: 2, content: "Core Technologies" },
      { type: 'list', items: [
        "NVIDIA Isaac Sim: Photorealistic simulation and synthetic data generation",
        "Isaac ROS: Hardware-accelerated VSLAM (Visual SLAM) and navigation",
        "Nav2: Path planning for bipedal humanoid movement"
      ]},
      { type: 'heading', level: 2, content: "Weekly Breakdown: Weeks 8-10" },
      { type: 'list', items: [
        "NVIDIA Isaac SDK and Isaac Sim",
        "AI-powered perception and manipulation",
        "Reinforcement learning for robot control",
        "Sim-to-real transfer techniques"
      ]},
    ]
  },
  {
    id: "module-4",
    number: 5,
    title: "Vision-Language-Action",
    subtitle: "VLA & Conversational Robotics",
    content: [
      { type: 'heading', level: 1, content: "Module 4: Vision-Language-Action (VLA)" },
      { type: 'paragraph', content: "Focus: The convergence of LLMs and Robotics. This module represents the cutting edge of robotics—enabling robots to understand and respond to natural language commands." },
      { type: 'heading', level: 2, content: "Key Capabilities" },
      { type: 'list', items: [
        "Voice-to-Action: Using OpenAI Whisper for voice commands",
        "Cognitive Planning: Using LLMs to translate natural language into ROS 2 actions",
        "Multi-modal interaction: speech, gesture, vision"
      ]},
      { type: 'heading', level: 2, content: "Weekly Breakdown: Week 13" },
      { type: 'list', items: [
        "Integrating GPT models for conversational AI in robots",
        "Speech recognition and natural language understanding",
        "Multi-modal interaction: speech, gesture, vision"
      ]},
      { type: 'callout', calloutType: 'info', content: 'Example: A command like "Clean the room" gets translated into a sequence of ROS 2 actions for navigation, object detection, and manipulation.' },
    ]
  },
  {
    id: "humanoid-development",
    number: 6,
    title: "Humanoid Robot Development",
    subtitle: "Building Bipedal Systems",
    content: [
      { type: 'heading', level: 1, content: "Humanoid Robot Development" },
      { type: 'paragraph', content: "Weeks 11-12 focus on the unique challenges of humanoid robotics—systems that mirror human form and capability." },
      { type: 'heading', level: 2, content: "Core Topics" },
      { type: 'list', items: [
        "Humanoid robot kinematics and dynamics",
        "Bipedal locomotion and balance control",
        "Manipulation and grasping with humanoid hands",
        "Natural human-robot interaction design"
      ]},
      { type: 'heading', level: 2, content: "Capstone Project: The Autonomous Humanoid" },
      { type: 'paragraph', content: "A final project where a simulated robot receives a voice command, plans a path, navigates obstacles, identifies an object using computer vision, and manipulates it." },
    ]
  },
  {
    id: "hardware",
    number: 7,
    title: "Hardware Requirements",
    subtitle: "Building Your Physical AI Lab",
    content: [
      { type: 'heading', level: 1, content: "Hardware Requirements" },
      { type: 'callout', calloutType: 'warning', content: "This course is technically demanding. It sits at the intersection of three heavy computational loads: Physics Simulation, Visual Perception, and Generative AI." },
      { type: 'heading', level: 2, content: "1. The Digital Twin Workstation" },
      { type: 'paragraph', content: "This is the most critical component. NVIDIA Isaac Sim requires RTX (Ray Tracing) capabilities." },
      { type: 'table', tableData: {
        headers: ["Component", "Requirement", "Notes"],
        rows: [
          ["GPU", "NVIDIA RTX 4070 Ti (12GB+)", "RTX 3090/4090 (24GB) ideal for Sim-to-Real"],
          ["CPU", "Intel i7 13th Gen+ / AMD Ryzen 9", "Physics calculations are CPU-intensive"],
          ["RAM", "64 GB DDR5", "32GB minimum, will crash during complex scenes"],
          ["OS", "Ubuntu 22.04 LTS", "ROS 2 is native to Linux"]
        ]
      }},
      { type: 'heading', level: 2, content: "2. Physical AI Edge Kit" },
      { type: 'table', tableData: {
        headers: ["Component", "Model", "Price", "Notes"],
        rows: [
          ["The Brain", "NVIDIA Jetson Orin Nano Super (8GB)", "$249", "40 TOPS capability"],
          ["The Eyes", "Intel RealSense D435i", "$349", "RGB + Depth + IMU for SLAM"],
          ["The Ears", "ReSpeaker USB Mic Array v2.0", "$69", "Far-field voice commands"],
          ["Storage", "128GB High-Endurance microSD", "$30", "Required for OS"]
        ]
      }},
      { type: 'heading', level: 2, content: "3. Robot Options" },
      { type: 'list', items: [
        "Option A (Budget): Unitree Go2 Edu (~$1,800-$3,000) - Quadruped proxy",
        "Option B (Miniature): Unitree G1 (~$16k) or Hiwonder TonyPi Pro (~$600)",
        "Option C (Premium): Unitree G1 Humanoid for full Sim-to-Real deployment"
      ]},
    ]
  },
  {
    id: "assessments",
    number: 8,
    title: "Assessments & Projects",
    subtitle: "Evaluating Your Progress",
    content: [
      { type: 'heading', level: 1, content: "Course Assessments" },
      { type: 'paragraph', content: "Throughout the course, you will complete several practical assessments that build toward the final capstone project." },
      { type: 'heading', level: 2, content: "Assessment Projects" },
      { type: 'list', items: [
        "ROS 2 package development project",
        "Gazebo simulation implementation",
        "Isaac-based perception pipeline",
        "Capstone: Simulated humanoid robot with conversational AI"
      ]},
      { type: 'heading', level: 2, content: "Lab Architecture Summary" },
      { type: 'table', tableData: {
        headers: ["Component", "Hardware", "Function"],
        rows: [
          ["Sim Rig", "PC with RTX 4080 + Ubuntu", "Runs Isaac Sim, Gazebo, Unity, trains models"],
          ["Edge Brain", "Jetson Orin Nano", "Runs inference stack, deployment target"],
          ["Sensors", "RealSense Camera + LiDAR", "Real-world data for AI"],
          ["Actuator", "Unitree Go2 or G1", "Receives motor commands from Jetson"]
        ]
      }},
      { type: 'callout', calloutType: 'tip', content: "Students train in the Cloud, download model weights, and flash them to the local Jetson kit to avoid latency issues with real robot control." },
    ]
  }
];
