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
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Our Mission
            </h2>

            <p className="mt-4 leading-8 text-slate-600 dark:text-gray-400">
              {mission}
            </p>
          </Card>

          <Card padding="lg">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Our Vision
            </h2>

            <p className="mt-4 leading-8 text-slate-600 dark:text-gray-400">
              {vision}
            </p>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
