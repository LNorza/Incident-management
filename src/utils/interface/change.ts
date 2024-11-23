export interface ICreateChange {
  piece_to_change?: string
  spare_part?: string
  device_type?: string
  make_request: boolean
  name?: string
  price?: string
  piece_type?: string
  description?: string
  incident: string
}

export interface IUpdateChange {
  piece_to_change?: string
  spare_part?: string
  name?: string
  price?: string
  piece_type?: string
  description?: string
  status?: string
  approval_date?: Date
}

export interface IChange {
  _id: string
  incident_folio?: string
  updatedAt?: string
  created_at?: string
  incident: []
  technician?: string
  device_type: string
  spare_part: string
  status?: string
  piece_type: string
  description?: string
}

