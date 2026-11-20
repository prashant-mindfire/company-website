import Card from "../common/ui/Card";
import Container from "../common/ui/Container";
import Section from "../common/ui/Section";

interface MissionVisionProps {
  mission?: string;
  vision?: string;
}

export default function MissionVision({ mission, vision }: MissionVisionProps) {
  return (
    <Section>
      <Container>
        <div className="grid gap-8 md:grid-cols-2">
          <Card padding="lg">
            <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>

            <p className="mt-4 leading-8 text-slate-600">{mission}</p>
          </Card>

          <Card padding="lg">
            <h2 className="text-2xl font-bold text-slate-900">Our Vision</h2>

            <p className="mt-4 leading-8 text-slate-600">{vision}</p>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
