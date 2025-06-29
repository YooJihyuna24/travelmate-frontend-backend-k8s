import unittest
from app import create_app

class RoutesTest(unittest.TestCase):
    def setUp(self):
        self.app = create_app().test_client()

    def test_recommendations(self):
        res = self.app.get('/recommendations')
        self.assertEqual(res.status_code, 200)
        self.assertIn('recommendations', res.get_json())

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

if __name__ == '__main__':
    unittest.main()
