# Chit-chat - FrontEnd
Czat z funkcjonalnościami profilu użytkownika oraz tworzeniem pokoi rozmów.

BackEnd: [chit-chat-back](https://github.com/GajuszPompejusz/ChitChatBackend)

## Spis Treści
- [Instalacja](#instalacja)
- [Technologie](#technologie)
- [Funkcjonalności](#funkcjonalności)
- [API](#api)
- [Strony](#strony)
- [Konteksty](#konteksty)
- [Komponenty](#komponenty)
- [Hooki](#hooki)

## Instalacja
Aplikacja wymaga uruchomionego backendu: [chit-chat-back](https://github.com/GajuszPompejusz/ChitChatBackend)

1. Sklonowanie repozytorium i instalacja zależności
```
git clone https://github.com/sw7105/chit-chat-front.git

cd chit-chat-front

npm install
```
2. Uruchomienie wersji deweloperskiej
```
npm run dev
```
3. Zbudowanie projektu i uruchomienie wersji produkcyjnej
```
npm run build

npm run start
```
4. Modyfikacja pliku .env
```bash
# Adres serwera backend
NEXT_PUBLIC_API=http://localhost:3001
```
## Technologie
- React
- Next.js
- Axios
- Bulma.io
- React Icons
   
## Funkcjonalności
- Logowanie / Rejestracja użytkowników
- Wyświetlanie / Edycja profilu
- Tworzenie / Dołączanie do pokoi
- Wyświetlanie listy pokoi / użytkowników
- Tworzenie zaproszeń
- Wysyłanie / Odbieranie wiadomości

## API
Aplikacja korzysta z API: [chit-chat-back](https://github.com/GajuszPompejusz/ChitChatBackend)
- Error
```
{
  error: string
}
```
- Logowanie
```
POST /login

Request:
{
  login: string,
  password: string
}

Response:
{
  userId: int,
  name: string
}
```
- Rejestracja
```
POST /register

Request:
{
  name: string,
  login: string,
  password: string
}

Response:
{
  userId: int,
  name: string
}
```
- Weryfikacja sesji
```
GET /session

Request: {}

Response:
{
  userId: int,
  name: string
}
```
- Wylogowanie
```
GET /logout

Request: {}

Response: {}
```
- Dane profilu
```
GET /profile

Request:
{
  userId: int
}

Response:
{
  name: string,
  description: string
}
```
- Edycja profilu
```
PUT /profile

Request:
{
  name: string,
  description: string
}

Response:
{
  name: string,
  description: string
}
```
- Tworzenie pokoju
```
POST /room

Request:
{
  name: string
}

Response:
{
  roomId: int
}
```
- Dane pokoju
```
GET /room

Request:
{
  roomId: int
}

Response:
{
  ownerId: int,
  users: [
    {
      id: int,
      name: string
    }
  ]
}
```
- Lista pokoi użytkownika
```
GET /rooms

Request: {}

Response:
{
  rooms: [
    {
      id: int,
      name: string
    }
  ]
}
```
- Kod zaproszenia
```
GET /invite

Request:
{
  roomId: int
}

Response:
{
  code: string
}
```
- Generowanie zaproszenia
```
POST /invite

Request:
{
  roomId: int
}

Response:
{
  code: string
}
```
- Dołączanie do pokoju
```
POST /join

Request:
{
  code: string
}

Response:
{
  roomId: int
}
```
- Wysyłanie wiadomości
```
POST /send

Request:
{
  roomId: int
  message: string
}

Response:
{
  id: int,
  date: string,
  message: string,
  owner: {
    id: int,
    name: string
  }
}
```
- Odbieranie wiadomości
```
GET /read

Request:
{
  roomId: int,
  lastMessageId: int?
}

Response:
{
  messages:
  [
    {
      id: int,
      date: string,
      message: string,
      owner: {
        id: int,
        name: string
      }
    }
  ]
}
}
```

## Strony
Aplikacja składa się z następujących podstron
- Logowanie / Rejestracja
```
/auth
```
- Aplikacja
```
/app
```
- Tworzenie / Dołączanie do pokoi
```
/app/room/add
```
- Pokój rozmów
```
/app/room/{roomId}
```
- Zapraszanie do pokoju
```
/app/room/{roomId}/invite
```
- Profil użytkownika
```
/app/profile/{profileId}?room={roomId}
```

## Konteksty
Dane pomiędzy komponentami są przekazywane za pomocą kontekstów.
- MainContext
```
Path: /*
Values:
{
  userId,
  setUserId,
  username,
  setUsername,
  addToast
}
```
- AppContext
```
Path: /app/*
Values:
{
  isPageLoading,
  isPageError,
  setIsPageLoading,
  setIsPageError,
  roomOwnerId,
  setRoomOwnerId
}
```

## Komponenty
- Loading
- Error
- SideBar
- ListItem
- RoomList
- UserList
- Message
- ToastBar
- Toast

## Hooki
- useAxios
```
axios
handleError()
getApiUrl()
```
- useToasts
```
toasts,
addToast,
removeToast
```
- useSessionState: Przechowuje stan w sessionStorage
```
state
setState
```
- useStorageState: Przechowuje stan w localStorage
```
state
setState
```
