export interface Group {
  id: string;
  name: string;
  participants: GroupParticipant[];
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
