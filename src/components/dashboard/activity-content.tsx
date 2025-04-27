import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';

export function ActivityContent() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Activity Calendar</h2>
        <Calendar
          mode="single"
          className="rounded-md border"
        />
      </Card>
    </div>
  );
}