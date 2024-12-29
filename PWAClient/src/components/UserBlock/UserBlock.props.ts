export interface UserBlockProps {
  username: string;
  email: string;
  geoData: string;
  logout?: () => void;
}
