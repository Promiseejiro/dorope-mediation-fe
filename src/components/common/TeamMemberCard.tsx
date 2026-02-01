import { twMerge } from "tailwind-merge";

interface TeamMemberCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  expertise: string[];
  email?: string;
  linkedin?: string;
  isVolunteer?: boolean;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  role,
  bio,
  image,
  expertise,
  email,
  linkedin,
  isVolunteer = false,
}) => {
  return (
    <div className="team-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="team-image w-full h-full object-cover"
        />
        {isVolunteer && (
          <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
            Volunteer
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-foreground">{name}</h3>
          <p className="text-accent font-semibold">{role}</p>
        </div>

        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{bio}</p>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">
            Expertise:
          </h4>
          <div className="flex flex-wrap gap-2">
            {expertise.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-light text-primary rounded-full text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex space-x-3">
            {email && (
              <a
                href={`mailto:${email}`}
                className="text-gray-500 hover:text-primary transition-colors"
                title="Email"
              >
                <i className="fas fa-envelope text-lg"></i>
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary transition-colors"
                title="LinkedIn"
              >
                <i className="fab fa-linkedin text-lg"></i>
              </a>
            )}
          </div>
          <span className="text-xs text-gray-500">
            {isVolunteer ? "Part-time" : "Full-time"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
