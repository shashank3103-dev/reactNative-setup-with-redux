export interface Video {
  videoId: string;
  title: string;
  videoUrl: string;
  duration: string;
}

export interface Section {
  sectionId: number;
  courseId: number;
  title: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  Videos: Video[];
}

export interface CourseData {
  courseId: number;
  title: string;
  tutor: string;
  category: string;
  price: any;
  description: string;
  target: string;
  duration: string;
  learning_minutes: number;
  requirements: string;
  lectures: number;
  image: string;
  is_published: boolean;
  addedBy: number;
  created_at: string;
  Sections: Section[];
  enrolled: boolean;
}

export interface CourseApiResponse {
  success: boolean;
  message: string;
  data: CourseData;
}
