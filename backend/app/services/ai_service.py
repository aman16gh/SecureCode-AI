from app.ai.groq_client import analyze_with_ai


def ai_analysis(code):

    response = analyze_with_ai(code)

    return response