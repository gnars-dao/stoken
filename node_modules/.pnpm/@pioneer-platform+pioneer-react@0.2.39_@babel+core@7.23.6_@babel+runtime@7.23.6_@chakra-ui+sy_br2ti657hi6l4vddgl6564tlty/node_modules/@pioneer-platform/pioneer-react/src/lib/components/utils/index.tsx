// If you defined MiddleEllipsisProps, make sure to export it
export interface MiddleEllipsisProps {
  text: string;
  // ... other properties if they exist
}

// Existing code with exported interface
export const checkKeepkeyAvailability = async () => {
  try {
    const response = await fetch("http://localhost:1646/spec/swagger.json");
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
  return false;
};

export const timeout = (ms: number | undefined): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Timeout"));
    }, ms);
  });
};

export const MiddleEllipsis: React.FC<MiddleEllipsisProps> = ({ text }) => {
  const maxLength = 20;
  const ellipsis = "...";

  if (!text || text.length <= maxLength) {
    return <span>{text}</span>;
  }

  const frontPart = text.slice(0, 7);
  const backPart = text.slice(-10);

  return (
    <span>
      {frontPart}
      {ellipsis}
      {backPart}
    </span>
  );
};
