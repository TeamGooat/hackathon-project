export interface LoginDetails {
  username: string;
  password: string;
}

export interface RegisterDetails {
  first_name :        string
  last_name  :        string
  username   :        string
  email      :        string
  password   :        string
}


export interface UserPayload {
  first_name :        string
  last_name  :        string
  username   :        string
  email      :        string
  user_id    :        string
}
