export interface BaseLogMessage {
  time: string
  type: 'quit' | 'join' | 'message' | 'nick' | 'action'
}

export interface QuitMessage extends BaseLogMessage {
  type: 'quit'
  user: string
  details: string
  reason: string
}

export interface JoinMessage extends BaseLogMessage {
  type: 'join'
  user: string
  details: string
}

export interface ChatMessage extends BaseLogMessage {
  type: 'message'
  user: string
  message: string
}

export interface NickMessage extends BaseLogMessage {
  type: 'nick'
  oldNick: string
  newNick: string
}

export interface ActionMessage extends BaseLogMessage {
  type: 'action'
  user: string
  action: string
}

export type LogMessage = QuitMessage | JoinMessage | ChatMessage | NickMessage | ActionMessage

export interface LogData {
  channel: string
  date: string
  messages: LogMessage[]
}
