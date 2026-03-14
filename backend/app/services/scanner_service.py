from app.security.static_analyzer import analyze_code
from app.services.ai_service import ai_analysis

def calculate_score(issues):
    score = 100 - (len(issues) * 20)
    return max(score, 0)

def parse_ai_analysis(ai_text):
    """Parse AI analysis text into structured issues"""
    issues = []

    # Simple parsing - in a real app, you'd use more sophisticated parsing
    if "SQL Injection" in ai_text or "sql" in ai_text.lower():
        issues.append({
            "type": "SQL Injection",
            "risk": "high",
            "message": "Potential SQL injection vulnerability detected",
            "fix": "Use parameterized queries or prepared statements"
        })

    if "password" in ai_text.lower() or "secret" in ai_text.lower():
        issues.append({
            "type": "Hardcoded Credentials",
            "risk": "high",
            "message": "Hardcoded credentials or secrets detected",
            "fix": "Use environment variables or secure credential management"
        })

    if "eval" in ai_text.lower() or "dangerous" in ai_text.lower():
        issues.append({
            "type": "Dangerous Function Usage",
            "risk": "medium",
            "message": "Potentially dangerous function usage detected",
            "fix": "Avoid using eval() or sanitize all inputs"
        })

    # If no specific issues found but AI provided analysis, create a general issue
    if not issues and ai_text.strip():
        issues.append({
            "type": "AI Security Analysis",
            "risk": "low",
            "message": "AI analysis completed - review the detailed analysis",
            "fix": ai_text[:200] + "..." if len(ai_text) > 200 else ai_text
        })

    return issues

def scan_code(code):
    # Get static analysis issues
    static_issues = analyze_code(code)

    # Get AI analysis
    ai_result = ai_analysis(code)

    # Parse AI analysis into issues format
    ai_issues = parse_ai_analysis(ai_result)

    # Combine all issues
    all_issues = static_issues + ai_issues

    # Calculate score based on all issues
    score = calculate_score(all_issues)

    return {
        "issues": all_issues,
        "security_score": score
    }