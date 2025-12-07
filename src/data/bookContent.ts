export interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  readTime?: string;
  sections: ContentSection[];
}

export interface ContentSection {
  id: string;
  title: string;
  content: ContentBlock[];
}

export type ContentBlock = 
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string; id: string }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'code'; code: string; language: string; title?: string }
  | { type: 'callout'; calloutType: 'info' | 'warning' | 'tip' | 'danger' | 'note'; title?: string; text: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'image'; src: string; alt: string; caption?: string };

export const bookInfo = {
  title: "Physical AI & Humanoid Robotics",
  subtitle: "A Comprehensive Textbook",
  edition: "First Edition",
  theme: "AI Systems in the Physical World • Embodied Intelligence",
  authors: ["Panaversity"],
  description: "Bridging the gap between the digital brain and the physical body. Learn to design, simulate, and deploy humanoid robots capable of natural human interactions using ROS 2, Gazebo, NVIDIA Isaac, and Vision-Language-Action models.",
};

export const chapters: Chapter[] = [
  {
    id: "introduction",
    number: 1,
    title: "Introduction to Physical AI",
    subtitle: "Foundations of Embodied Intelligence",
    readTime: "15 min read",
    sections: [
      {
        id: "overview",
        title: "Course Overview",
        content: [
          { type: 'heading', level: 2, text: "What is Physical AI?", id: "what-is-physical-ai" },
          { type: 'paragraph', text: "Physical AI represents a paradigm shift in artificial intelligence—moving beyond digital-only systems to AI that can perceive, understand, and interact with the physical world. Unlike traditional AI that processes text or images, Physical AI systems control robots that navigate real environments, manipulate objects, and collaborate with humans." },
          { type: 'callout', calloutType: 'info', title: "Key Concept", text: "Physical AI = Digital Intelligence + Real-World Embodiment. It combines machine learning, computer vision, robotics, and natural language processing to create robots that understand physical laws and human interactions." },
          { type: 'paragraph', text: "The future of AI extends beyond digital spaces into the physical world. This course introduces Physical AI—AI systems that function in reality and comprehend physical laws like gravity, friction, and momentum. Students learn to design, simulate, and deploy humanoid robots capable of natural human interactions." },
          
          { type: 'heading', level: 2, text: "Why Humanoid Robots?", id: "why-humanoid" },
          { type: 'paragraph', text: "Humanoid robots are designed to work in environments built for humans. Since our world—homes, offices, factories—is designed around the human form, robots that share our physical structure can:" },
          { type: 'list', items: [
            "Navigate stairs, doors, and tight spaces designed for humans",
            "Use tools and equipment made for human hands",
            "Communicate naturally through gestures and body language",
            "Learn from human demonstrations through imitation learning",
            "Be trained using vast amounts of human activity data"
          ]},
          
          { type: 'heading', level: 2, text: "Course Modules Overview", id: "modules-overview" },
          { type: 'paragraph', text: "This course is structured into four core modules, each building upon the previous:" },
          { type: 'table', headers: ["Module", "Focus Area", "Key Technologies"], rows: [
            ["Module 1", "The Robotic Nervous System", "ROS 2, rclpy, URDF"],
            ["Module 2", "The Digital Twin", "Gazebo, Unity, Sensor Simulation"],
            ["Module 3", "The AI-Robot Brain", "NVIDIA Isaac Sim, VSLAM, Nav2"],
            ["Module 4", "Vision-Language-Action", "LLMs, Whisper, Multi-modal AI"]
          ]},
          
          { type: 'heading', level: 2, text: "Learning Outcomes", id: "learning-outcomes" },
          { type: 'paragraph', text: "By the end of this course, you will be able to:" },
          { type: 'list', ordered: true, items: [
            "Understand Physical AI principles and embodied intelligence",
            "Master ROS 2 (Robot Operating System) for robotic control",
            "Simulate robots with Gazebo and Unity digital twins",
            "Develop with NVIDIA Isaac AI robot platform",
            "Design humanoid robots for natural human interactions",
            "Integrate GPT models for conversational robotics"
          ]},
          
          { type: 'callout', calloutType: 'tip', title: "Pro Tip", text: "Focus on understanding the concepts deeply rather than rushing through. Each module builds on the previous one, and a solid foundation in ROS 2 will make everything else much easier." },
        ]
      }
    ]
  },
  {
    id: "module-1",
    number: 2,
    title: "The Robotic Nervous System",
    subtitle: "ROS 2 Fundamentals",
    readTime: "25 min read",
    sections: [
      {
        id: "ros2-intro",
        title: "Introduction to ROS 2",
        content: [
          { type: 'heading', level: 2, text: "What is ROS 2?", id: "what-is-ros2" },
          { type: 'paragraph', text: "ROS 2 (Robot Operating System 2) is not an operating system in the traditional sense—it is a flexible framework for writing robot software. Think of it as the 'nervous system' of a robot, providing the communication infrastructure that allows different parts (sensors, motors, AI modules) to work together seamlessly." },
          { type: 'callout', calloutType: 'info', title: "ROS vs ROS 2", text: "ROS 2 is a complete rewrite of the original ROS, built for production-grade robotics with real-time capabilities, security features, and support for multiple platforms including embedded systems." },
          
          { type: 'heading', level: 2, text: "Core Concepts", id: "core-concepts" },
          { type: 'heading', level: 3, text: "Nodes", id: "nodes" },
          { type: 'paragraph', text: "Nodes are the fundamental computational units in ROS 2. Each node is a process that performs a specific task—one node might control a camera, another might process images, and a third might plan robot movement." },
          { type: 'code', language: "python", title: "minimal_node.py", code: `import rclpy
from rclpy.node import Node

class MinimalNode(Node):
    def __init__(self):
        super().__init__('minimal_node')
        self.get_logger().info('Hello from ROS 2!')

def main(args=None):
    rclpy.init(args=args)
    node = MinimalNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()` },
          
          { type: 'heading', level: 3, text: "Topics", id: "topics" },
          { type: 'paragraph', text: "Topics enable asynchronous communication between nodes using a publish-subscribe pattern. A node publishes messages to a topic, and any number of nodes can subscribe to receive those messages." },
          { type: 'code', language: "python", title: "publisher_example.py", code: `from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = f'Hello World: {self.i}'
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing: "{msg.data}"')
        self.i += 1` },
          
          { type: 'heading', level: 3, text: "Services", id: "services" },
          { type: 'paragraph', text: "Services provide synchronous request-response communication. Unlike topics, services are used when you need to know if a command was successful or need to receive computed data back." },
          
          { type: 'heading', level: 2, text: "URDF - Robot Description", id: "urdf" },
          { type: 'paragraph', text: "URDF (Unified Robot Description Format) is an XML format that describes a robot's physical properties—its links (body parts), joints (connections), visual appearance, and collision geometry." },
          { type: 'code', language: "xml", title: "simple_robot.urdf", code: `<?xml version="1.0"?>
<robot name="simple_robot">
  <!-- Base Link -->
  <link name="base_link">
    <visual>
      <geometry>
        <box size="0.5 0.5 0.1"/>
      </geometry>
      <material name="blue">
        <color rgba="0 0 0.8 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <box size="0.5 0.5 0.1"/>
      </geometry>
    </collision>
  </link>
  
  <!-- Arm Joint -->
  <joint name="base_to_arm" type="revolute">
    <parent link="base_link"/>
    <child link="arm_link"/>
    <origin xyz="0 0 0.1" rpy="0 0 0"/>
    <axis xyz="0 0 1"/>
    <limit lower="-3.14" upper="3.14" effort="10" velocity="1"/>
  </joint>
</robot>` },
          
          { type: 'callout', calloutType: 'warning', title: "Common Mistake", text: "Always define collision geometry even if it matches visual geometry. Without collision definitions, physics simulation will not work correctly." },
        ]
      }
    ]
  },
  {
    id: "module-2",
    number: 3,
    title: "The Digital Twin",
    subtitle: "Gazebo & Unity Simulation",
    readTime: "20 min read",
    sections: [
      {
        id: "simulation-intro",
        title: "Introduction to Robot Simulation",
        content: [
          { type: 'heading', level: 2, text: "Why Simulate?", id: "why-simulate" },
          { type: 'paragraph', text: "Robot simulation is essential because testing on real hardware is expensive, slow, and potentially dangerous. A digital twin—a virtual replica of your robot and environment—allows you to:" },
          { type: 'list', items: [
            "Test algorithms safely without risking hardware damage",
            "Train AI models with unlimited synthetic data",
            "Iterate rapidly on designs before manufacturing",
            "Parallelize testing across thousands of simulated robots",
            "Reproduce exact scenarios for debugging"
          ]},
          
          { type: 'heading', level: 2, text: "Gazebo Simulation", id: "gazebo" },
          { type: 'paragraph', text: "Gazebo is an open-source robotics simulator that provides accurate physics simulation, sensor modeling, and a 3D visualization environment. It integrates seamlessly with ROS 2." },
          { type: 'callout', calloutType: 'info', title: "Gazebo Versions", text: "Gazebo Classic (versions 9-11) is being replaced by the new Gazebo (formerly Ignition Gazebo). This course uses the new Gazebo for its improved architecture and performance." },
          
          { type: 'heading', level: 3, text: "Physics Engine", id: "physics-engine" },
          { type: 'paragraph', text: "Gazebo uses physics engines (ODE, Bullet, DART) to simulate rigid body dynamics, collisions, friction, and gravity. This allows robots to interact realistically with their environment." },
          
          { type: 'heading', level: 3, text: "Sensor Simulation", id: "sensor-simulation" },
          { type: 'paragraph', text: "Gazebo can simulate various sensors that robots commonly use:" },
          { type: 'table', headers: ["Sensor Type", "Description", "Use Case"], rows: [
            ["LiDAR", "Laser-based distance measurement", "Navigation, obstacle detection"],
            ["Depth Camera", "RGB + Distance per pixel", "3D reconstruction, object recognition"],
            ["IMU", "Acceleration and angular velocity", "Balance, orientation tracking"],
            ["Force/Torque", "Measures forces on joints", "Manipulation, grasping"]
          ]},
          
          { type: 'heading', level: 2, text: "Unity for Robotics", id: "unity" },
          { type: 'paragraph', text: "Unity, traditionally a game engine, is increasingly used for robotics simulation due to its high-fidelity rendering and extensive asset libraries. Unity Robotics Hub provides ROS 2 integration." },
          { type: 'callout', calloutType: 'tip', title: "When to Use Unity", text: "Use Unity when you need photorealistic rendering for computer vision training, or when simulating complex human-robot interaction scenarios. Use Gazebo for pure physics simulation and ROS integration." },
          
          { type: 'heading', level: 2, text: "SDF vs URDF", id: "sdf-urdf" },
          { type: 'paragraph', text: "While URDF is the standard in ROS, Gazebo uses SDF (Simulation Description Format) which is more expressive:" },
          { type: 'list', items: [
            "SDF supports multiple robots in one file",
            "SDF can define world elements (lights, physics settings)",
            "SDF has more sensor and joint types",
            "URDF can be automatically converted to SDF"
          ]},
        ]
      }
    ]
  },
  {
    id: "module-3",
    number: 4,
    title: "The AI-Robot Brain",
    subtitle: "NVIDIA Isaac Platform",
    readTime: "25 min read",
    sections: [
      {
        id: "isaac-intro",
        title: "NVIDIA Isaac Overview",
        content: [
          { type: 'heading', level: 2, text: "What is NVIDIA Isaac?", id: "what-is-isaac" },
          { type: 'paragraph', text: "NVIDIA Isaac is a comprehensive robotics platform that provides hardware-accelerated AI capabilities for robots. It includes simulation, perception, and deployment tools optimized for NVIDIA GPUs." },
          
          { type: 'heading', level: 3, text: "Isaac Sim", id: "isaac-sim" },
          { type: 'paragraph', text: "Isaac Sim is built on NVIDIA Omniverse and provides photorealistic simulation with physically accurate rendering. Key features include:" },
          { type: 'list', items: [
            "Ray-traced rendering for realistic lighting and reflections",
            "Synthetic data generation for AI training",
            "Domain randomization for robust model training",
            "Direct integration with PyTorch and TensorFlow"
          ]},
          { type: 'callout', calloutType: 'warning', title: "Hardware Requirements", text: "Isaac Sim requires an NVIDIA RTX GPU with at least 12GB VRAM. RTX 3090 or 4090 (24GB) is recommended for complex scenes." },
          
          { type: 'heading', level: 3, text: "Isaac ROS", id: "isaac-ros" },
          { type: 'paragraph', text: "Isaac ROS provides GPU-accelerated ROS 2 packages for perception and navigation:" },
          { type: 'table', headers: ["Package", "Function", "Acceleration"], rows: [
            ["Isaac ROS VSLAM", "Visual SLAM", "30x faster than CPU"],
            ["Isaac ROS DNN Inference", "Neural network inference", "TensorRT optimized"],
            ["Isaac ROS Depth Segmentation", "Semantic segmentation", "Real-time performance"],
            ["Isaac ROS Freespace Segmentation", "Obstacle detection", "Camera-based navigation"]
          ]},
          
          { type: 'heading', level: 2, text: "Visual SLAM (VSLAM)", id: "vslam" },
          { type: 'paragraph', text: "VSLAM (Visual Simultaneous Localization and Mapping) allows robots to build a map of their environment while simultaneously tracking their position within it—using only camera data." },
          { type: 'code', language: "python", title: "vslam_example.py", code: `# Launch Isaac ROS VSLAM with RealSense camera
# This creates a 3D map while tracking robot pose

import launch
from launch_ros.actions import Node

def generate_launch_description():
    return launch.LaunchDescription([
        # RealSense camera node
        Node(
            package='realsense2_camera',
            executable='realsense2_camera_node',
            parameters=[{
                'depth_module.profile': '640x480x30',
                'rgb_camera.profile': '640x480x30',
            }]
        ),
        # Isaac ROS Visual SLAM
        Node(
            package='isaac_ros_visual_slam',
            executable='visual_slam_node',
            parameters=[{
                'enable_localization_n_mapping': True,
                'enable_imu_fusion': True,
            }]
        ),
    ])` },
          
          { type: 'heading', level: 2, text: "Nav2 Navigation", id: "nav2" },
          { type: 'paragraph', text: "Nav2 is the ROS 2 navigation stack that enables autonomous robot navigation. For humanoid robots, it provides path planning adapted for bipedal locomotion." },
          { type: 'callout', calloutType: 'tip', title: "Bipedal Navigation", text: "Humanoid robots require special consideration for balance during navigation. Nav2 can be configured with custom planners that account for foot placement and center of mass." },
        ]
      }
    ]
  },
  {
    id: "module-4",
    number: 5,
    title: "Vision-Language-Action",
    subtitle: "VLA & Conversational Robotics",
    readTime: "30 min read",
    sections: [
      {
        id: "vla-intro",
        title: "The VLA Revolution",
        content: [
          { type: 'heading', level: 2, text: "What are VLA Models?", id: "what-is-vla" },
          { type: 'paragraph', text: "Vision-Language-Action (VLA) models represent the cutting edge of robotics AI. These models can see (vision), understand commands (language), and generate robot movements (action) in a single unified architecture." },
          { type: 'callout', calloutType: 'info', title: "The VLA Breakthrough", text: "VLA models like RT-2 and OpenVLA have shown that a single model can generalize across different robots and tasks, learning from both internet-scale data and robot demonstrations." },
          
          { type: 'heading', level: 2, text: "Voice-to-Action Pipeline", id: "voice-to-action" },
          { type: 'paragraph', text: "A complete voice-to-action system converts spoken commands into robot movements:" },
          { type: 'list', ordered: true, items: [
            "Audio Capture: Microphone captures user's voice",
            "Speech Recognition: OpenAI Whisper transcribes audio to text",
            "Intent Understanding: LLM parses command and extracts intent",
            "Task Planning: LLM breaks down task into subtasks",
            "Action Generation: VLA model generates robot trajectories",
            "Execution: ROS 2 controllers execute movements"
          ]},
          
          { type: 'code', language: "python", title: "voice_command_node.py", code: `import rclpy
from rclpy.node import Node
import whisper
import openai

class VoiceCommandNode(Node):
    def __init__(self):
        super().__init__('voice_command')
        self.whisper_model = whisper.load_model("base")
        self.action_pub = self.create_publisher(
            RobotAction, 'robot_action', 10
        )
    
    def process_audio(self, audio_path):
        # Step 1: Transcribe with Whisper
        result = self.whisper_model.transcribe(audio_path)
        command = result["text"]
        self.get_logger().info(f'Heard: {command}')
        
        # Step 2: Parse with LLM
        actions = self.parse_command_with_llm(command)
        
        # Step 3: Publish actions to robot
        for action in actions:
            self.action_pub.publish(action)
    
    def parse_command_with_llm(self, command):
        response = openai.chat.completions.create(
            model="gpt-4",
            messages=[{
                "role": "system",
                "content": """You are a robot command parser.
                Convert natural language to robot actions.
                Available actions: MOVE, PICK, PLACE, LOOK"""
            }, {
                "role": "user", 
                "content": command
            }]
        )
        return self.parse_actions(response.choices[0].message.content)` },
          
          { type: 'heading', level: 2, text: "Cognitive Planning with LLMs", id: "cognitive-planning" },
          { type: 'paragraph', text: "Large Language Models excel at breaking down complex tasks into manageable steps. For example, the command 'Clean the living room' might be decomposed into:" },
          { type: 'list', items: [
            "Scan the room for objects out of place",
            "Identify trash items and locate trash bin",
            "Pick up each trash item and dispose",
            "Identify items that belong elsewhere",
            "Transport each item to its proper location",
            "Verify room is clean"
          ]},
          { type: 'callout', calloutType: 'tip', title: "Grounding LLMs", text: "The key challenge is 'grounding' - connecting the LLM's abstract knowledge to the robot's physical capabilities. This requires providing the LLM with information about what the robot can actually do." },
          
          { type: 'heading', level: 2, text: "Multi-Modal Interaction", id: "multi-modal" },
          { type: 'paragraph', text: "Modern humanoid robots combine multiple interaction modalities for natural communication:" },
          { type: 'table', headers: ["Modality", "Input", "Output"], rows: [
            ["Speech", "Whisper STT", "TTS with emotion"],
            ["Gesture", "Pose estimation", "Expressive movements"],
            ["Gaze", "Eye tracking", "Looking at objects/people"],
            ["Expression", "Emotion recognition", "Facial expressions"],
            ["Haptics", "Force sensors", "Gentle/firm touch"]
          ]},
        ]
      }
    ]
  },
  {
    id: "humanoid-development",
    number: 6,
    title: "Humanoid Robot Development",
    subtitle: "Building Bipedal Systems",
    readTime: "20 min read",
    sections: [
      {
        id: "humanoid-basics",
        title: "Humanoid Fundamentals",
        content: [
          { type: 'heading', level: 2, text: "Kinematics & Dynamics", id: "kinematics" },
          { type: 'paragraph', text: "Humanoid robots present unique challenges due to their bipedal nature. Unlike wheeled robots, they must constantly maintain balance while moving." },
          
          { type: 'heading', level: 3, text: "Forward Kinematics", id: "forward-kinematics" },
          { type: 'paragraph', text: "Forward kinematics calculates the position of the robot's end effectors (hands, feet) given joint angles. For a humanoid with 30+ joints, this involves complex chain calculations." },
          
          { type: 'heading', level: 3, text: "Inverse Kinematics", id: "inverse-kinematics" },
          { type: 'paragraph', text: "Inverse kinematics solves the opposite problem: given a desired hand position, what joint angles are needed? This is essential for reaching and grasping." },
          
          { type: 'heading', level: 2, text: "Bipedal Locomotion", id: "locomotion" },
          { type: 'paragraph', text: "Walking is deceptively complex. A humanoid must:" },
          { type: 'list', items: [
            "Maintain the Zero Moment Point (ZMP) within the support polygon",
            "Shift weight from one foot to the other smoothly",
            "Swing the free leg while maintaining balance",
            "Absorb impacts during foot strike",
            "Adapt to uneven terrain in real-time"
          ]},
          { type: 'callout', calloutType: 'info', title: "ZMP Control", text: "The Zero Moment Point is the point where the sum of horizontal moments is zero. Keeping ZMP within the foot (or feet during double support) is key to stability." },
          
          { type: 'heading', level: 2, text: "Manipulation & Grasping", id: "manipulation" },
          { type: 'paragraph', text: "Humanoid hands must be dexterous enough to handle everyday objects while being robust enough for practical tasks. Modern approaches use:" },
          { type: 'list', items: [
            "Tactile sensors in fingertips for grip detection",
            "Force control for delicate object handling",
            "Visual servoing for precise positioning",
            "Learning from demonstration for new grasps"
          ]},
          
          { type: 'heading', level: 2, text: "Capstone Project", id: "capstone" },
          { type: 'paragraph', text: "The final project integrates all modules: A simulated humanoid robot receives a voice command, plans a path, navigates obstacles, identifies an object using computer vision, and manipulates it." },
          { type: 'callout', calloutType: 'tip', title: "Project Scope", text: "Focus on getting the full pipeline working before optimizing individual components. A working end-to-end demo is more valuable than a perfect subsystem." },
        ]
      }
    ]
  },
  {
    id: "hardware",
    number: 7,
    title: "Hardware Requirements",
    subtitle: "Building Your Physical AI Lab",
    readTime: "15 min read",
    sections: [
      {
        id: "hardware-overview",
        title: "Lab Setup Guide",
        content: [
          { type: 'heading', level: 2, text: "Hardware Overview", id: "hardware-overview" },
          { type: 'callout', calloutType: 'warning', title: "Important", text: "This course is technically demanding. It sits at the intersection of three heavy computational loads: Physics Simulation, Visual Perception, and Generative AI. Plan your hardware accordingly." },
          
          { type: 'heading', level: 2, text: "The Digital Twin Workstation", id: "workstation" },
          { type: 'paragraph', text: "NVIDIA Isaac Sim requires RTX (Ray Tracing) capabilities. Standard laptops will not work." },
          { type: 'table', headers: ["Component", "Minimum", "Recommended"], rows: [
            ["GPU", "RTX 4070 Ti (12GB)", "RTX 4090 (24GB)"],
            ["CPU", "Intel i7 13th Gen", "Intel i9 / AMD Ryzen 9"],
            ["RAM", "32 GB DDR5", "64 GB DDR5"],
            ["Storage", "512 GB NVMe SSD", "1 TB NVMe SSD"],
            ["OS", "Ubuntu 22.04 LTS", "Ubuntu 22.04 LTS"]
          ]},
          { type: 'callout', calloutType: 'danger', title: "Mac Not Supported", text: "NVIDIA Isaac Sim and Isaac ROS do not run on macOS due to CUDA requirements. Windows is partially supported but Ubuntu is strongly recommended." },
          
          { type: 'heading', level: 2, text: "Physical AI Edge Kit", id: "edge-kit" },
          { type: 'paragraph', text: "For deploying to real hardware, you need an edge computing kit:" },
          { type: 'table', headers: ["Component", "Model", "Price", "Purpose"], rows: [
            ["Brain", "Jetson Orin Nano Super (8GB)", "$249", "Run inference stack"],
            ["Eyes", "Intel RealSense D435i", "$349", "RGB + Depth + IMU"],
            ["Ears", "ReSpeaker USB Mic Array", "$69", "Voice commands"],
            ["Storage", "128GB microSD", "$30", "OS and models"]
          ]},
          
          { type: 'heading', level: 2, text: "Robot Hardware Options", id: "robot-options" },
          { type: 'heading', level: 3, text: "Option A: Proxy Approach (Budget)", id: "option-a" },
          { type: 'paragraph', text: "Use a quadruped or robotic arm as a learning proxy. The software principles transfer 90% to humanoids." },
          { type: 'list', items: [
            "Unitree Go2 Edu (~$1,800-$3,000) - Excellent ROS 2 support",
            "Software principles transfer directly to humanoids",
            "Durable and practical for testing"
          ]},
          
          { type: 'heading', level: 3, text: "Option B: Miniature Humanoid", id: "option-b" },
          { type: 'list', items: [
            "Unitree G1 (~$16,000) - Full humanoid capabilities",
            "Hiwonder TonyPi Pro (~$600) - Budget option for kinematics only"
          ]},
          { type: 'callout', calloutType: 'warning', title: "Budget Robots", text: "Cheap humanoid kits typically run on Raspberry Pi and cannot run NVIDIA Isaac ROS. Use them for kinematics practice only." },
          
          { type: 'heading', level: 2, text: "Cloud Alternative", id: "cloud" },
          { type: 'paragraph', text: "If you cannot build a physical lab, consider cloud resources:" },
          { type: 'list', items: [
            "AWS g5.2xlarge instances (~$1.50/hour) for Isaac Sim",
            "Train in cloud, deploy to local Jetson",
            "Still need edge kit for physical deployment"
          ]},
          { type: 'callout', calloutType: 'tip', title: "Latency Warning", text: "Never control real robots from cloud instances! Train in cloud, download weights, run inference locally." },
        ]
      }
    ]
  },
  {
    id: "assessments",
    number: 8,
    title: "Assessments & Projects",
    subtitle: "Evaluating Your Progress",
    readTime: "10 min read",
    sections: [
      {
        id: "assessments-overview",
        title: "Course Assessments",
        content: [
          { type: 'heading', level: 2, text: "Assessment Overview", id: "assessment-overview" },
          { type: 'paragraph', text: "Throughout the course, you will complete practical assessments that build toward the final capstone project. Each assessment tests your understanding of a specific module." },
          
          { type: 'heading', level: 2, text: "Project 1: ROS 2 Package", id: "project-1" },
          { type: 'paragraph', text: "Create a ROS 2 package that demonstrates:" },
          { type: 'list', items: [
            "Custom message types",
            "Publisher-subscriber communication",
            "Service client-server interaction",
            "Launch file configuration",
            "Parameter management"
          ]},
          
          { type: 'heading', level: 2, text: "Project 2: Gazebo Simulation", id: "project-2" },
          { type: 'paragraph', text: "Build a simulated robot environment:" },
          { type: 'list', items: [
            "Complete URDF with visual and collision geometry",
            "Working sensors (camera, LiDAR, IMU)",
            "Custom world with obstacles",
            "ROS 2 control integration"
          ]},
          
          { type: 'heading', level: 2, text: "Project 3: Isaac Perception", id: "project-3" },
          { type: 'paragraph', text: "Implement a perception pipeline using NVIDIA Isaac:" },
          { type: 'list', items: [
            "Visual SLAM for mapping",
            "Object detection with DNN",
            "Semantic segmentation",
            "Integration with Nav2"
          ]},
          
          { type: 'heading', level: 2, text: "Capstone: Autonomous Humanoid", id: "capstone-project" },
          { type: 'paragraph', text: "The final capstone project integrates everything:" },
          { type: 'callout', calloutType: 'info', title: "Capstone Requirements", text: "A simulated humanoid robot that: 1) Receives a voice command, 2) Plans a path, 3) Navigates obstacles, 4) Identifies objects with CV, 5) Manipulates the target object." },
          
          { type: 'heading', level: 2, text: "Lab Architecture Summary", id: "lab-summary" },
          { type: 'table', headers: ["Component", "Hardware", "Function"], rows: [
            ["Sim Rig", "PC with RTX 4080 + Ubuntu", "Isaac Sim, Gazebo, model training"],
            ["Edge Brain", "Jetson Orin Nano", "Inference stack, deployment"],
            ["Sensors", "RealSense + LiDAR", "Real-world perception"],
            ["Actuator", "Unitree Go2/G1", "Physical robot control"]
          ]},
        ]
      }
    ]
  }
];
