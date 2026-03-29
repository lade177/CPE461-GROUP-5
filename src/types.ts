/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Course {
  id: string;
  code: string;
  name: string;
  difficulty: number; // 1-5
  workload: number; // 1-5
  workloadReason: string;
  lecturerTags: string[];
  examStructure: string;
  frequency: string;
  attendance: string;
  bulkiness: number; // 1-10
  examType: string;
  assignmentsInfo: string;
  lecturers: string[];
  reviews: Review[];
  pastQuestions: PastQuestion[];
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  isAnonymous: boolean;
}

export interface PastQuestion {
  id: string;
  title: string;
  year: string;
  semester: string;
  upvotes: number;
  confirmedBy: number;
  isExamRelevant: boolean;
  fileUrl: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  deadline: string;
  status: 'Not Started' | 'In Progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  reminders: boolean;
}
