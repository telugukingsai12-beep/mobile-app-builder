import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SkillsSelectorProps {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
}

const SKILL_CATEGORIES = {
  Technical: ['Web Development', 'Graphic Design', 'Data Analysis', 'Photography', 'Video Editing'],
  Communication: ['Public Speaking', 'Writing', 'Teaching', 'Translation', 'Social Media'],
  Practical: ['Cooking', 'Gardening', 'Construction', 'First Aid', 'Driving'],
  Administrative: ['Event Planning', 'Fundraising', 'Project Management', 'Accounting', 'Legal'],
  Creative: ['Art', 'Music', 'Crafts', 'Storytelling', 'Performance'],
};

export const SkillsSelector = ({ selectedSkills, onSkillsChange }: SkillsSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const allSkills = Object.values(SKILL_CATEGORIES).flat();
  const filteredSkills = allSkills.filter((skill) =>
    skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      onSkillsChange(selectedSkills.filter((s) => s !== skill));
    } else {
      onSkillsChange([...selectedSkills, skill]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Selected Skills */}
      {selectedSkills.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {selectedSkills.map((skill) => (
            <Badge key={skill} variant="default" className="gap-1">
              {skill}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => toggleSkill(skill)}
              />
            </Badge>
          ))}
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Skills by Category */}
      <ScrollArea className="h-[300px]">
        <div className="space-y-4">
          {searchQuery ? (
            // Show filtered results
            <Card className="p-4">
              <div className="flex gap-2 flex-wrap">
                {filteredSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant={selectedSkills.includes(skill) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ) : (
            // Show categories
            Object.entries(SKILL_CATEGORIES).map(([category, skills]) => (
              <Card key={category} className="p-4">
                <h3 className="font-semibold mb-3">{category}</h3>
                <div className="flex gap-2 flex-wrap">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant={selectedSkills.includes(skill) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
