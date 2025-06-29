import unittest
from app import create_app

class RoutesTest(unittest.TestCase):
    def setUp(self):
        self.app = create_app().test_client()

    def test_recommendations(self):
        res = self.app.get('/recommendations')
        self.assertEqual(res.status_code, 200)
        self.assertIn('recommendations', res.get_json())

if __name__ == '__main__':
    unittest.main()
