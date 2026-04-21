import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica", fontSize: 10, color: "#000" },
  name: { fontSize: 16, fontWeight: "bold", textAlign: "center" },
  subHeader: { fontSize: 10, textAlign: "center", color: "#6b7280", marginTop: 4 },
  hr: { borderBottom: "1px solid #e5e7eb", marginVertical: 10 },
  section: { flexDirection: "row", marginBottom: 8 },
  sectionTitle: { width: 80, fontSize: 9, fontWeight: "bold", letterSpacing: 1 },
  sectionContent: { flex: 1 },
  projectTitle: { fontWeight: "bold", marginBottom: 2 },
  gray: { color: "#6b7280", marginBottom: 2 },
  link: { color: "#3b82f6", marginRight: 8 },
  row: { flexDirection: "row", gap: 8 },
});

const ResumePDF = ({ resume }) => {
    console.log(resume);
    
  const formatDate = (date) =>
    new Date(date).toLocaleString("default", { month: "short", year: "numeric" });

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* HEADER */}
        <Text style={styles.name}>
          {resume?.userId?.firstName} {resume.userId?.lastName}, {resume.title}
        </Text>
        <Text style={styles.subHeader}>
          {resume.personalInfo?.address} | {resume.personalInfo?.phone} | {resume.userId?.emailId}
        </Text>

        <View style={styles.hr} />

        {/* LINKS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LINKS</Text>
          <View style={[styles.sectionContent, { flexDirection: "row", gap: 12 }]}>
            {resume.personalInfo?.github && <Link src={resume.personalInfo.github} style={styles.link}>GitHub</Link>}
            {resume.personalInfo?.linkedin && <Link src={resume.personalInfo.linkedin} style={styles.link}>LinkedIn</Link>}
            {resume.personalInfo?.portfolio && <Link src={resume.personalInfo.portfolio} style={styles.link}>Portfolio</Link>}
          </View>
        </View>

        <View style={styles.hr} />

        {/* PROFILE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROFILE</Text>
          <Text style={styles.sectionContent}>{resume.description}</Text>
        </View>

        <View style={styles.hr} />

        {/* PROJECTS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROJECTS</Text>
          <View style={styles.sectionContent}>
            {resume.projects?.map((proj, i) => (
              <View key={i} style={{ marginBottom: 10 }}>
                <Text style={styles.projectTitle}>{proj.title}</Text>
                <Text style={styles.gray}>{formatDate(proj.startDate)} - {formatDate(proj.endDate)}</Text>
                <View style={styles.row}>
                  <Link src={proj.demoLink} style={styles.link}>Demo</Link>
                  <Link src={proj.githubLink} style={styles.link}>Code</Link>
                </View>
                <Text style={{ marginTop: 2 }}>{proj.description}</Text>
                <Text style={styles.gray}>Tech: {proj.techStack?.join(", ")}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.hr} />

        {/* EDUCATION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          <View style={styles.sectionContent}>
            {resume.education?.map((e, i) => (
              <View key={i} style={{ marginBottom: 8 }}>
                <Text style={styles.projectTitle}>{e.degree}, {e.institute}</Text>
                <Text style={styles.gray}>
                  {new Date(e.startDate).getFullYear()} - {new Date(e.endDate).getFullYear()}
                </Text>
                <Text>{e.fieldOfStudy}</Text>
                <Text>CGPA - {e.grade}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.hr} />

        {/* SKILLS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SKILLS</Text>
          <Text style={styles.sectionContent}>{resume.skills?.join(", ")}</Text>
        </View>

        <View style={styles.hr} />

        {/* LANGUAGES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LANGUAGES</Text>
          <Text style={styles.sectionContent}>{resume.languages?.map((l) => l.name).join(", ")}</Text>
        </View>

      </Page>
    </Document>
  );
};

export default ResumePDF;