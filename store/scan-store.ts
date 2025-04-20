export interface User {
    id: string;
    name: string;
    email: string;
    points: number;
    scans: number;
    isAdmin?: boolean;
  }
  
  export interface Bridge {
    id: string;
    name: string;
    district: string;
    state: string;
    country: string;
    location: string;
    pointsPerScan: number;
  }
  
  export interface Reward {
    id: string;
    title: string;
    description: string;
    pointsCost: number;
    image: string;
  }
  
  export interface Scan {
    id: string;
    userId: string;
    bridgeId: string;
    bridgeName: string;
    points: number;
    timestamp: number;
  }
  
  export interface SafetyTip {
    id: string;
    title: string;
    content: string;
    image?: string;
  }