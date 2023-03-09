export interface ICurrentTemplatesData {
  lastSync: null | number;
  currentTemplates: ICurrentTemplates;
}

export interface ICurrentTemplates {
  [key: string]: IJourney;
}

export interface IJourney {
  version: number;
  languageVersion: number;
  language: string;
  friendName: string;
  currentStep: string;
  lastUpdated: null | number;
  lastSync: null | number;
  legs: ILeg[];
}

export interface ILeg {
  order: number;
  legId: string;
  completed: boolean;
  steps: IStep[];
}

export interface IStep {
  order: number;
  stepTitleId: string;
  stepSubtitleId: string;
  completed: boolean;
  statistics: {
    startDateTime: null | number;
    finishDateTime: null | number;
    calculate: null | number;
  };
  subSteps: ISubstep[];
}

export interface ISubstep {
  order: number;
  headerId: string;
  contentId: string;
  notifications: any[];
  screenTime: number;
}
export interface IContent {
  currentTemplatesData: ICurrentTemplatesData;
  contentLanguages: any;
}
