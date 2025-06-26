import unittest
import json
from app import app, init_db, get_db

class UserServiceTestCase(unittest.TestCase):
    def setUp(self):
        """
        Vor jedem Test:
          - Test-Client erstellen
          - Test-Datenbank zurücksetzen (leeren)
        """
        self.app = app.test_client()
        self.app.testing = True
        # Datenbank truncaten (alle User löschen)
        with get_db() as db:
            db.execute("DELETE FROM users")
            db.commit()

    def test_register_user(self):
        # User registrieren
        res = self.app.post("/users/register", json={
            "username": "alice",
            "password": "secret"
        })
        self.assertEqual(res.status_code, 201)
        self.assertIn("User registered successfully", res.get_data(as_text=True))

    def test_register_duplicate_user(self):
        # User zweimal registrieren -> Fehler beim zweiten Mal
        self.app.post("/users/register", json={
            "username": "bob",
            "password": "pass"
        })
        res = self.app.post("/users/register", json={
            "username": "bob",
            "password": "pass"
        })
        self.assertEqual(res.status_code, 409)
        self.assertIn("User already exists", res.get_data(as_text=True))

    def test_login_valid(self):
        # User registrieren und dann einloggen
        self.app.post("/users/register", json={"username": "eve", "password": "pw"})
        res = self.app.post("/users/login", json={"username": "eve", "password": "pw"})
        self.assertEqual(res.status_code, 200)
        self.assertIn("Login successful", res.get_data(as_text=True))

    def test_login_invalid(self):
        # Ungültige Logindaten
        res = self.app.post("/users/login", json={"username": "nope", "password": "fail"})
        self.assertEqual(res.status_code, 401)
        self.assertIn("Invalid credentials", res.get_data(as_text=True))

    def test_save_and_get_places(self):
        # User anlegen, Orte speichern, Orte abrufen
        self.app.post("/users/register", json={"username": "frank", "password": "pw"})
        save = self.app.post("/users/frank/places", json={
            "places": ["Paris", "Berlin"]
        })
        self.assertEqual(save.status_code, 200)
        self.assertIn("Places saved", save.get_data(as_text=True))
        get = self.app.get("/users/frank/places")
        self.assertEqual(get.status_code, 200)
        data = get.get_json()
        self.assertEqual(data["places"], ["Paris", "Berlin"])

    def test_save_places_for_nonexistent_user(self):
        # Orte speichern für nicht-existenten User -> Fehler
        res = self.app.post("/users/unknown/places", json={"places": ["Rome"]})
        self.assertEqual(res.status_code, 404)
        self.assertIn("User not found", res.get_data(as_text=True))

    def test_get_places_for_nonexistent_user(self):
        # Orte abfragen für nicht-existenten User -> Fehler
        res = self.app.get("/users/nobody/places")
        self.assertEqual(res.status_code, 404)
        self.assertIn("User not found", res.get_data(as_text=True))

if __name__ == "__main__":
    # Datenbank sicherstellen
    init_db()
    unittest.main()
