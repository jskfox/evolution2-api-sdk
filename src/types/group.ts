export interface Group {
  id: string;
  name: string;
  participants: GroupParticipant[];
}

export interface GroupOptions {
  id: string;
  subject: string;
  subjectOwner?: string;
  subjectTime?: number;
  creation?: number;
  owner?: string;
  desc?: string;
  descOwner?: string;
  descId?: string;
  restrict?: boolean;
  announce?: boolean;
  participants?: any[];
}

export interface GroupParticipant {
  id: string;
  admin: boolean;
  superAdmin: boolean;
}

export interface CreateGroupParams {
  name: string;
  participants: string[];
}

export interface GroupParticipantAction {
  groupId: string;
  participantId: string;
}
