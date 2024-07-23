import { Icon, Text } from "@rneui/themed";
import { FlatList, StyleSheet, View } from "react-native";
import { useTheme } from "../../../../theme/ThemeProvider";
import JobSectionTitle from "./JobSectionTitle";
import JobSection from "./JobSesction";

const requirements = {
  title: "Exigences",
  label: 1,
  icon: "playlist-add-check",
  value: [
    "Bachelor's degree in Computer Science, Software Engineering, or a related field.",
    "Proven experience as a Software Developer, Software Engineer, or similar role.",
    "Strong knowledge of programming languages such as JavaScript, Python, Java, C#, or others relevant to the role.",
    "Experience with front-end technologies and frameworks (e.g., React, Angular, Vue.js).",
    "Experience with back-end technologies and frameworks (e.g., Node.js, Django, Spring).",
    "Familiarity with databases (e.g., SQL, NoSQL) and data modeling.",
    "Knowledge of software development methodologies, such as Agile and Scrum.",
    "Strong problem-solving skills and attention to detail.",
    "Excellent communication and teamwork abilities.",
    "Familiarity with version control systems (e.g., Git).",
    "Understanding of software testing principles and practices.",
    "Ability to learn new technologies and adapt to changing requirements.",
    "Experience with cloud platforms (e.g., AWS, Azure, Google Cloud) is a plus.",
    "Knowledge of security best practices in software development.",
    "Experience with DevOps practices and tools (e.g., CI/CD, Docker, Kubernetes) is a plus.",
  ],
};

const responsibilities = {
  title: "Responsabilités",
  icon: "work",
  label: "",
  value: [
    "Develop Software Solutions: Design, code, test, and implement software applications to meet project requirements and customer needs.",
    "Collaborate with Team Members: Work with other developers, designers, and stakeholders to understand project goals and requirements.",
    "Maintain Code Quality: Ensure the code is clean, maintainable, and follows industry best practices and standards.",
    "Debug and Troubleshoot: Identify and fix bugs and performance issues in existing software applications.",
    "Conduct Code Reviews: Review code written by other team members to ensure quality and adherence to project guidelines.",
    "Stay Updated with Technology Trends: Keep up-to-date with the latest software development tools, techniques, and technologies.",
    "Write Documentation: Create and maintain documentation for code, technical specifications, and project requirements.",
    "Implement Security Best Practices: Ensure that software applications are secure and comply with security standards.",
    "Participate in Agile Processes: Engage in daily stand-ups, sprint planning, and retrospective meetings as part of the agile development process.",
    "Optimize Performance: Enhance the performance of applications by making improvements in code efficiency and resource usage.",
    "Collaborate with QA Teams: Work with Quality Assurance teams to ensure that software applications are thoroughly tested and meet quality standards.",
    "Provide Technical Support: Assist with troubleshooting and resolving technical issues reported by end-users or clients.",
    "Continuous Improvement: Identify areas for improvement in the development process and propose solutions to enhance productivity and quality.",
    "Mentor Junior Developers: Provide guidance and support to less experienced team members to help them grow and develop their skills.",
  ],
};

const salary = {
  title: "Avantages et salaires",
  icon: "attach-money",
  value: [
    "Annual salary range: $70,000 - $100,000, depending on experience and qualifications.",
    "Performance-based bonuses and incentives.",
    "Equity options for high-performing employees.",
    "Annual salary reviews and increases based on performance.",
    "Relocation assistance if applicable.",
  ],
};

const benefits = {
  title: "Avantages",
  icon: "check-circle",
  value: [
    "Competitive salary based on experience and skills.",
    "Health, dental, and vision insurance.",
    "Retirement savings plan with company match.",
    "Paid time off (PTO) and holidays.",
    "Professional development opportunities.",
    "Flexible working hours and remote work options.",
    "Employee assistance program (EAP).",
    "Commuter benefits and transportation allowance.",
    "Fitness and wellness programs.",
    "Company-sponsored social events and team-building activities.",
    "Casual dress code and a collaborative work environment.",
    "Opportunities for career growth and advancement.",
    "Support for continuing education and certification.",
    "Access to the latest technology and tools.",
  ],
};

const skills = {
  title: "Compétences",
  label: "",
  icon: "stars",
  value: [
    "Proficient in JavaScript, including DOM manipulation and the JavaScript object model.",
    "Thorough understanding of React.js and its core principles.",
    "Experience with popular React.js workflows (such as Flux or Redux).",
    "Familiarity with RESTful APIs.",
    "Knowledge of modern authorization mechanisms, such as JSON Web Token.",
    "Experience with front-end development tools such as Babel, Webpack, NPM, etc.",
    "Ability to understand business requirements and translate them into technical requirements.",
    "Familiarity with code versioning tools such as Git.",
    "Strong understanding of HTML5, CSS3, and JavaScript.",
    "Experience with responsive and adaptive design.",
    "Knowledge of cross-browser compatibility issues and ways to work around them.",
    "Understanding of Agile methodologies.",
    "Strong problem-solving and analytical skills.",
    "Excellent communication and teamwork skills.",
    "Ability to perform well in a fast-paced environment.",
    "Attention to detail and commitment to quality.",
    "Experience with TypeScript is a plus.",
    "Familiarity with testing frameworks and tools such as Jest or Mocha.",
    "Knowledge of CI/CD pipelines and tools like Jenkins, CircleCI, or GitHub Actions.",
    "Experience with backend development (Node.js, Express, etc.) is a plus.",
  ],
};

const educationRequirements = {
  title: "Education Requirements",
  icon: "school",
  value: [
    "Bachelor's degree in Computer Science or related field.",
    "Relevant certifications in software development.",
    "Experience with programming languages such as JavaScript and Python.",
    "Knowledge of web development frameworks and libraries.",
  ],
};

const careerOpportunities = {
  title: "Career Opportunities",
  icon: "business-center",
  value: [
    "Opportunity to lead a development team.",
    "Potential to advance to senior developer or engineering manager.",
    "Access to professional development and training.",
    "Participation in high-impact projects.",
  ],
};

const companyCulture = {
  title: "Company Culture",
  icon: "group",
  value: [
    "Collaborative and inclusive work environment.",
    "Focus on continuous learning and innovation.",
    "Supportive leadership and open communication.",
    "Regular team-building activities and events.",
  ],
};

const applicationContact = {
  title: "Application Contact",
  icon: "contact-mail",
  value: [
    "For inquiries, contact hr@company.com.",
    "Call us at (123) 456-7890.",
    "Visit our office at 123 Main Street, City, Country.",
  ],
};

const applicationProcess = {
  title: "Application Process",
  icon: "how-to-reg",
  value: [
    "Submit your resume and cover letter through our website.",
    "Complete the online assessment test.",
    "Attend an interview with the hiring team.",
    "Receive feedback and job offer within two weeks.",
  ],
};

const publicationAndDeadline = {
  title: "Publication and Deadline",
  icon: "calendar-today",
  value: [
    "Job posting published on July 1, 2024.",
    "Applications accepted until July 31, 2024.",
    "Final decision and job offer expected by August 15, 2024.",
  ],
};

const JobDetails = () => {
  const { theme } = useTheme();

  const data = [
    requirements,
    responsibilities,
    skills,
    salary,
    benefits,
    educationRequirements,
    careerOpportunities,
    applicationContact,
    companyCulture,
    applicationProcess,
    publicationAndDeadline,
  ];

  return (
    <View>
      {data.map((item, id) => (
        <View key={id}>
          {item.title && <JobSectionTitle title={item.title} />}
          <View style={styles.responsabilities}>
            <FlatList
              alwaysBounceVertical={false}
              data={item.value}
              renderItem={({ item, index }) => {
                return (
                  <JobSection
                    label={
                      data[id].label == 1 ? `${index + 1}.` : data[id].label
                    }
                    icon={data[id].icon}
                    value={item}
                  />
                );
              }}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  responsabilities: {
    paddingVertical: 16,
    gap: 12,
  },
});

export default JobDetails;
