import re
from app.security.regex_rules import *
from app.security.vulnerability_db import VULNERABILITIES


def analyze_code(code):

    issues = []

    if re.search(SQL_INJECTION, code):
        issues.append({
            "type": "SQL Injection",
            **VULNERABILITIES["SQL_INJECTION"]
        })

    if re.search(HARDCODED_SECRET, code):
        issues.append({
            "type": "Hardcoded Secret",
            **VULNERABILITIES["HARDCODED_SECRET"]
        })

    if re.search(DANGEROUS_EVAL, code):
        issues.append({
            "type": "Dangerous Function",
            **VULNERABILITIES["DANGEROUS_EVAL"]
        })

    return issues