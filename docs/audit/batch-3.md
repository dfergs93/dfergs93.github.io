# Batch 3: Cardiac CT, valve grading and the Bernoulli calculator

Started 2026-11-27 · old cardiac site at 84b6118. Generated from `batch-3.json`; do not edit.

166 findings: 64 correct, 6 outdated, 45 wrong, 2 not-lead, 13 unsourced, 1 local-practice, 35 source-not-readable. 40 flagged management.

## Coronary CT angiography and CAD-RADS

https://dfergs93.github.io/cardiac-imaging-resources/cardiac_ct/

### B3-cardiac-ct-ccta-01 · Page title, scope line and section heading; the page has no reference box or references

- **Verdict:** wrong
- **Kind:** provenance · **Topic:** Coronary CT angiography
- **The page says:** Title "Cardiac CT" (nav: "Cardiac CT › Protocols & Troubleshooting"); scope line "This page covers general protocol requirements, acquisition considerations, and troubleshooting pearls."; heading "CAD-RADS 2.0 Reporting". No reference box, citation, version box or reference list anywhere on the page. (The preceding Protocol Manager sentence is site-wide and left to the coordinator.)
- **Source:** Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 1 Coronary CT Angiography (CCTA). Can Assoc Radiol J. 2024;75(3):488-501. doi:10.1177/08465371241233240 — Reporting Standards, p. 492 (PDF p. 5): "For CCTA, the Coronary Artery Disease-Reporting and Data System (CAD-RADS 2.0) was created to standardize reporting and interpretation (Figure 1). It includes management recommendations ..."; Figure 1 p. 493 (PDF p. 6); p. 495 (PDF p. 8): CAD-RADS categories, P1-P4 and modifiers. CAR Part 1 is the lead for CCTA acquisition, contrast and reporting and adopts CAD-RADS 2.0; Cury RC, Leipsic J, Abbara S, et al. CAD-RADS™ 2.0 - 2022 Coronary Artery Disease-Reporting and Data System: an expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT), the American College of Cardiology (ACC), the American College of Radiology (ACR), and the North America Society of Cardiovascular Imaging (NASCI). Radiol Cardiothorac Imaging. 2022;4(5):e220183. doi:10.1148/ryct.220183 (also J Cardiovasc Comput Tomogr. 2022;16(6):536-557 and JACC Cardiovasc Imaging 2022, doi:10.1016/j.jcmg.2022.07.002). — Abstract, p. 1; Table 8 p. 18: the 2022 update and its changes from the 2016 version; Rajiah PS, Alkadhi H, Andreini D, et al. Interpretation and reporting of coronary computed tomographic angiography (2026 update): an expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT). J Cardiovasc Comput Tomogr. 2026;20(5):459-482. doi:10.1016/j.jcct.2026.08.014 — Introduction, p. 460: "reporting has been standardized through CAD-RADS 2.0" (so 2.0 is still the current version)
- **Proposed fix:** Drop "general protocol requirements, acquisition considerations" from the scope line (those sections were removed in April 2026, commit 03b90dd) and add a reference box: CAR/CSTR 2024 Part 1 (lead; adopts CAD-RADS 2.0), CAD-RADS 2.0 (Cury 2022) for categories and modifiers, SCCT 2026 for artifacts and reporting. "CAD-RADS 2.0" is still current.
- **Proposed home:** Coronary CT angiography › Background

### B3-cardiac-ct-ccta-02 · CAD-RADS 2.0 table as a whole: columns, plaque burden (P1-P4), stable vs acute chest pain, vessel size

- **Verdict:** wrong · **management**
- **Kind:** guideline-threshold · **Topic:** Coronary CT angiography
- **The page says:** Table "CAD-RADS | Stenosis | Recommendation" with rows 0, 1, 2, 3, 4A, 4B, 5 and N. The page has no plaque-burden category (P1-P4) anywhere; the "Recommendation" column gives one set of entries, not said to be for stable or acute chest pain; no rule on which vessels are graded.
- **Source:** Cury RC, Leipsic J, Abbara S, et al. CAD-RADS™ 2.0 - 2022 Coronary Artery Disease-Reporting and Data System: an expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT), the American College of Cardiology (ACC), the American College of Radiology (ACR), and the North America Society of Cardiovascular Imaging (NASCI). Radiol Cardiothorac Imaging. 2022;4(5):e220183. doi:10.1148/ryct.220183 (also J Cardiovasc Comput Tomogr. 2022;16(6):536-557 and JACC Cardiovasc Imaging 2022, doi:10.1016/j.jcmg.2022.07.002). — Table 1 p. 3 (P1 mild, P2 moderate, P3 severe, P4 extensive); Table 2 p. 4 (P1 CAC 1-100 / SIS ≤2; P2 101-300 / 3-4; P3 301-999 / 5-7; P4 >1000 / ≥8; or visual); Table 4 p. 5 (stable chest pain: columns Interpretation, Further Cardiac Investigation and Management considerations, the last graded by P, e.g. CAD-RADS 1 "P1: Consider risk factor modification and preventive pharmacotherapy ... P3 or P4: Aggressive risk factor modification and preventive pharmacotherapy"; footer "All vessels greater than 1.5 mm in diameter should be graded for stenosis severity"); Table 5 p. 6 (acute chest pain, with different investigations: e.g. 4A and 4B "Hospital admission with cardiology consultation"); p. 17 and Table 8 p. 18 (code order: stenosis, then P, then modifiers); Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 1 Coronary CT Angiography (CCTA). Can Assoc Radiol J. 2024;75(3):488-501. doi:10.1177/08465371241233240 — p. 495 (PDF p. 8): "The update incorporates new P1 to P4 descriptors, denoting increasing categories of plaque burden"; Figure 1 p. 493 (PDF p. 6) labels every example with its P category; Rajiah PS, Alkadhi H, Andreini D, et al. Interpretation and reporting of coronary computed tomographic angiography (2026 update): an expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT). J Cardiovasc Comput Tomogr. 2026;20(5):459-482. doi:10.1016/j.jcct.2026.08.014 — Table 3 p. 467 (P1-P4 by visual, SIS and CAC; P4 CAC ≥1000); §3.5 Impression p. 479: "A CAD-RADS category of stenosis (0,1,2,3,4A,4B,5,N) followed by plaque volume (P1,P2,P3,P4) and then modifiers (N,HRP,I,S,G,E)"
- **Proposed fix:** Add the P1-P4 plaque-burden category with CAD-RADS Table 2's methods, rename the third column "Interpretation" and add Table 4's investigation and management (stable chest pain), with Table 5's acute chest pain entries or a note that they differ; state that vessels >1.5 mm are graded.
- **Proposed home:** Coronary CT angiography › Categories

### B3-cardiac-ct-ccta-03 · CAD-RADS table, row 0

- **Verdict:** wrong · **management**
- **Kind:** guideline-threshold · **Topic:** Coronary CT angiography
- **The page says:** "0 | No stenosis | No CAD"
- **Source:** Cury RC, Leipsic J, Abbara S, et al. CAD-RADS™ 2.0 - 2022 Coronary Artery Disease-Reporting and Data System: an expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT), the American College of Cardiology (ACC), the American College of Radiology (ACR), and the North America Society of Cardiovascular Imaging (NASCI). Radiol Cardiothorac Imaging. 2022;4(5):e220183. doi:10.1148/ryct.220183 (also J Cardiovasc Comput Tomogr. 2022;16(6):536-557 and JACC Cardiovasc Imaging 2022, doi:10.1016/j.jcmg.2022.07.002). — Table 4 p. 5: "CAD-RADS 0 | 0% (No plaque or stenosis) | Absence of CAD | None | Reassurance. Consider non-atherosclerotic causes of symptoms"; footnote b: "CAD-RADS 1 - This category should also include the presence of plaque with positive remodeling and no evidence of stenosis"; Figure 2 p. 7; Rajiah PS, Alkadhi H, Andreini D, et al. Interpretation and reporting of coronary computed tomographic angiography (2026 update): an expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT). J Cardiovasc Comput Tomogr. 2026;20(5):459-482. doi:10.1016/j.jcct.2026.08.014 — §3.5 p. 479: "An impression of a normal study should be given only if there is no plaque or stenosis"; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 1 Coronary CT Angiography (CCTA). Can Assoc Radiol J. 2024;75(3):488-501. doi:10.1177/08465371241233240 — p. 495 (PDF p. 8): "CAD-RADS 0 (absence of CAD; no coronary stenosis)"; Figure 1A p. 493: "CAD-RADS 0. No plaque or stenosis"
- **Proposed fix:** Criterion "0% - no plaque or stenosis"; plaque without stenosis (including positively remodelled plaque) is CAD-RADS 1 (Table 4, footnote b). Management: "Reassurance; consider non-atherosclerotic causes of symptoms".
- **Proposed home:** Coronary CT angiography › Categories

### B3-cardiac-ct-ccta-04 · CAD-RADS table, rows 1 and 2

- **Verdict:** correct
- **Kind:** guideline-threshold · **Topic:** Coronary CT angiography
- **The page says:** "1 | 1–24% | Minimal, non-obstructive"; "2 | 25–49% | Mild, non-obstructive"
- **Source:** Cury RC, Leipsic J, Abbara S, et al. CAD-RADS™ 2.0 - 2022 Coronary Artery Disease-Reporting and Data System: an expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT), the American College of Cardiology (ACC), the American College of Radiology (ACR), and the North America Society of Cardiovascular Imaging (NASCI). Radiol Cardiothorac Imaging. 2022;4(5):e220183. doi:10.1148/ryct.220183 (also J Cardiovasc Comput Tomogr. 2022;16(6):536-557 and JACC Cardiovasc Imaging 2022, doi:10.1016/j.jcmg.2022.07.002). — Table 1 p. 3 (1-24% minimal, 25-49% mild stenosis); Table 4 p. 5: CAD-RADS 1 "1-24% | Minimal non-obstructive CAD | None", CAD-RADS 2 "25-49% (Mild stenosis) | Mild non-obstructive CAD | None", management by P; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 1 Coronary CT Angiography (CCTA). Can Assoc Radiol J. 2024;75(3):488-501. doi:10.1177/08465371241233240 — p. 495 (PDF p. 8): "CAD-RADS 1 (minimal non-obstructive CAD; 1%-24% maximal coronary stenosis), CAD-RADS 2 (mild non-obstructive CAD; maximal coronary stenosis 25%-49%)"; Rajiah PS, Alkadhi H, Andreini D, et al. Interpretation and reporting of coronary computed tomographic angiography (2026 update): an expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT). J Cardiovasc Comput Tomogr. 2026;20(5):459-482. doi:10.1016/j.jcct.2026.08.014 — §2.2.4 p. 465 and Table 5 p. 478: minimal (1-24%), mild (25-49%)
- **Proposed fix:** Optional: the third column holds the interpretation, not a recommendation; Table 4's entries for these categories are "Further cardiac investigation: None" with risk-factor modification and preventive pharmacotherapy graded by P (see B3-cardiac-ct-ccta-02).
- **Proposed home:** Coronary CT angiography › Categories

### B3-cardiac-ct-ccta-05 · CAD-RADS table, row 3 recommendation

- **Verdict:** wrong · **management**
- **Kind:** guideline-threshold · **Topic:** Coronary CT angiography
- **The page says:** "3 | 50–69% | Moderate — functional testing recommended"
- **Source:** Cury RC, Leipsic J, Abbara S, et al. CAD-RADS™ 2.0 - 2022 Coronary Artery Disease-Reporting and Data System: an expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT), the American College of Cardiology (ACC), the American College of Radiology (ACR), and the North America Society of Cardiovascular Imaging (NASCI). Radiol Cardiothorac Imaging. 2022;4(5):e220183. doi:10.1148/ryct.220183 (also J Cardiovasc Comput Tomogr. 2022;16(6):536-557 and JACC Cardiovasc Imaging 2022, doi:10.1016/j.jcmg.2022.07.002). — Table 4 p. 5: "CAD-RADS 3 | 50-69% (Moderate stenosis) | Moderate stenosis | Consider functional assessment" (footnote c: CT-FFR, CTP, stress testing or invasive FFR); management "When modifier I+, consider ICA, especially if frequent symptoms persist after guideline-directed medical therapy"; §3.1.1 pp. 3-4: "Further testing should be considered if this information will change patient management and ... if the patient has persistent symptoms despite adequate medical therapy"; Table 10 p. 20: "Consider CT-FFR, CTP or stress testing"; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 1 Coronary CT Angiography (CCTA). Can Assoc Radiol J. 2024;75(3):488-501. doi:10.1177/08465371241233240 — p. 495 (PDF p. 8): 50%-69% band; "CAD-RADS 2.0 also provides post-test recommendations based on the CAD-RADS classification" (CAR defers the recommendations to CAD-RADS)
- **Proposed fix:** "Consider functional assessment (CT-FFR, CT perfusion or stress testing); with I+, consider ICA" (Table 4), not "recommended". The 50–69% band is right.
- **Proposed home:** Coronary CT angiography › Management

### B3-cardiac-ct-ccta-06 · CAD-RADS table, row 4A

- **Verdict:** wrong · **management**
- **Kind:** guideline-threshold · **Topic:** Coronary CT angiography
- **The page says:** "4A | 70–99% (1–2 vessels) | Severe — ICA or FFR-CT"
- **Source:** Cury RC, Leipsic J, Abbara S, et al. CAD-RADS™ 2.0 - 2022 Coronary Artery Disease-Reporting and Data System: an expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT), the American College of Cardiology (ACC), the American College of Radiology (ACR), and the North America Society of Cardiovascular Imaging (NASCI). Radiol Cardiothorac Imaging. 2022;4(5):e220183. doi:10.1148/ryct.220183 (also J Cardiovasc Comput Tomogr. 2022;16(6):536-557 and JACC Cardiovasc Imaging 2022, doi:10.1016/j.jcmg.2022.07.002). — p. 4: 4A is "a single vessel or two vessels demonstrating severe stenosis (70-99%). Further evaluation with ICA or functional imaging, including CT-FFR, CTP and stress testing (ETT, stress echocardiogram, SPECT, PET or Cardiac MRI) or invasive FFR is usually recommended"; Table 4 p. 5: "A: Consider ICA or functional assessment", footnote e: ICA "may be favored if high-grade stenosis (>90%), high-risk plaque features or I+"; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 1 Coronary CT Angiography (CCTA). Can Assoc Radiol J. 2024;75(3):488-501. doi:10.1177/08465371241233240 — Figure 1E p. 493 (PDF p. 6): "CAD-RADS 4A/P3. Severe stenosis (70%-99%) without left main ≥50% or 3-vessel obstructive (≥70%) disease"; p. 497 (PDF p. 10): "CT-FFR is currently not widely used in Canada due to lack of availability and reimbursement by provincial health care plans"
- **Proposed fix:** "Consider ICA or functional assessment (CT-FFR, CT perfusion, stress testing or invasive FFR)", ICA favoured with >90% stenosis, high-risk plaque or I+ (Table 4, footnote e); add "without left main ≥50% or 3-vessel disease". The 70–99% band is right.
- **Proposed home:** Coronary CT angiography › Management

### B3-cardiac-ct-ccta-07 · CAD-RADS table, row 4B

- **Verdict:** wrong · **management**
- **Kind:** guideline-threshold · **Topic:** Coronary CT angiography
- **The page says:** "4B | 70–99% (LM or 3-vessel) | Severe — heart team"
- **Source:** Cury RC, Leipsic J, Abbara S, et al. CAD-RADS™ 2.0 - 2022 Coronary Artery Disease-Reporting and Data System: an expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT), the American College of Cardiology (ACC), the American College of Radiology (ACR), and the North America Society of Cardiovascular Imaging (NASCI). Radiol Cardiothorac Imaging. 2022;4(5):e220183. doi:10.1148/ryct.220183 (also J Cardiovasc Comput Tomogr. 2022;16(6):536-557 and JACC Cardiovasc Imaging 2022, doi:10.1016/j.jcmg.2022.07.002). — Table 4 p. 5: "B - Left main ≥50% or 3-vessel obstructive (≥70%) disease"; "B: ICA is recommended"; p. 4: "a left main stenosis of at least 50% or three-vessel obstructive disease (>70%). Further evaluation with ICA and possible revascularization is usually recommended"; Table 5 p. 6 (acute): "Hospital admission with cardiology consultation ... B ICA is recommended"; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 1 Coronary CT Angiography (CCTA). Can Assoc Radiol J. 2024;75(3):488-501. doi:10.1177/08465371241233240 — p. 495 (PDF p. 8): "CAD-RADS 4 (severe stenosis; 70%-99% stenosis or left main ≥50% or 3-vessel obstructive [≥70%] disease)"; Figure 1E p. 493
- **Proposed fix:** 4B is left main ≥50% (not 70–99%) or 3-vessel obstructive (≥70%) disease, and the recommendation is "ICA is recommended", not "heart team". As written, a 50–69% left main stenosis falls into row 3.
- **Proposed home:** Coronary CT angiography › Categories

### B3-cardiac-ct-ccta-08 · CAD-RADS table, row 5

- **Verdict:** correct
- **Kind:** guideline-threshold · **Topic:** Coronary CT angiography
- **The page says:** "5 | Total occlusion |" (recommendation cell empty)
- **Source:** Cury RC, Leipsic J, Abbara S, et al. CAD-RADS™ 2.0 - 2022 Coronary Artery Disease-Reporting and Data System: an expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT), the American College of Cardiology (ACC), the American College of Radiology (ACR), and the North America Society of Cardiovascular Imaging (NASCI). Radiol Cardiothorac Imaging. 2022;4(5):e220183. doi:10.1148/ryct.220183 (also J Cardiovasc Comput Tomogr. 2022;16(6):536-557 and JACC Cardiovasc Imaging 2022, doi:10.1016/j.jcmg.2022.07.002). — Table 4 p. 5: "CAD-RADS 5 | 100% (total occlusion) | Total coronary occlusion or sub-total occlusion | Consider ICA, functional and/or viability assessment"; Table 5 p. 6 (acute): "Expedited ICA and revascularization if suspected acute occlusion" unless the occlusion is chronic; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 1 Coronary CT Angiography (CCTA). Can Assoc Radiol J. 2024;75(3):488-501. doi:10.1177/08465371241233240 — p. 495 (PDF p. 8): "CAD-RADS 5 (total coronary occlusion; 100% stenosis)"
- **Proposed fix:** Optional: fill the empty cell from Table 4 ("Consider ICA, functional and/or viability assessment") and, for acute chest pain, Table 5 ("Expedited ICA and revascularization if suspected acute occlusion").
- **Proposed home:** Coronary CT angiography › Management

### B3-cardiac-ct-ccta-09 · CAD-RADS table, row N

- **Verdict:** wrong · **management**
- **Kind:** guideline-threshold · **Topic:** Coronary CT angiography
- **The page says:** "N | Non-diagnostic segment |" (recommendation cell empty)
- **Source:** Cury RC, Leipsic J, Abbara S, et al. CAD-RADS™ 2.0 - 2022 Coronary Artery Disease-Reporting and Data System: an expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT), the American College of Cardiology (ACC), the American College of Radiology (ACR), and the North America Society of Cardiovascular Imaging (NASCI). Radiol Cardiothorac Imaging. 2022;4(5):e220183. doi:10.1148/ryct.220183 (also J Cardiovasc Comput Tomogr. 2022;16(6):536-557 and JACC Cardiovasc Imaging 2022, doi:10.1016/j.jcmg.2022.07.002). — §3.3.1 pp. 11-12: "'N' can be used as a modifier or as a CAD-RADS category ... a stenosis ≥50% is present in a diagnostic segment (CAD-RADS ≥3), the most severe stenosis should be graded in addition to the modifier N" (e.g. CAD-RADS 3/P2/N, Figure 12 p. 12); CAD-RADS N is used for "at least one non-interpretable segment and no stenosis (zero), minimal (1-24%), or no more than mild stenosis (25-49%) in interpretable segments"; Table 4 p. 5: "CAD-RADS N | Non-diagnostic study | Obstructive CAD cannot be excluded | Additional/alternative evaluation may be needed"; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 1 Coronary CT Angiography (CCTA). Can Assoc Radiol J. 2024;75(3):488-501. doi:10.1177/08465371241233240 — p. 495 (PDF p. 8): "N (non-diagnostic study)" listed among the modifiers
- **Proposed fix:** N is a non-diagnostic study: the category only when no interpretable segment has ≥50% stenosis; otherwise grade the worst stenosis and add /N (e.g. 4A/P3/N). Recommendation: "Obstructive CAD cannot be excluded; additional or alternative evaluation may be needed".
- **Proposed home:** Coronary CT angiography › Categories

### B3-cardiac-ct-ccta-10 · Modifiers line

- **Verdict:** wrong
- **Kind:** guideline-threshold · **Topic:** Coronary CT angiography
- **The page says:** "Modifiers: `+HRP` (high-risk plaque), `+S` (stent), `+G` (graft), `+E` (exception), `+I` (ischemia)"
- **Source:** Cury RC, Leipsic J, Abbara S, et al. CAD-RADS™ 2.0 - 2022 Coronary Artery Disease-Reporting and Data System: an expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT), the American College of Cardiology (ACC), the American College of Radiology (ACR), and the North America Society of Cardiovascular Imaging (NASCI). Radiol Cardiothorac Imaging. 2022;4(5):e220183. doi:10.1148/ryct.220183 (also J Cardiovasc Comput Tomogr. 2022;16(6):536-557 and JACC Cardiovasc Imaging 2022, doi:10.1016/j.jcmg.2022.07.002). — §3.3 pp. 9-10 (modifiers N, S, G, HRP; new I and E; V replaced by HRP); §3.3.5 pp. 15-17 with Tables 6-7 pp. 15-16 (I+, I- or I±; CT-FFR ≤0.75 positive, 0.76-0.80 borderline, >0.80 negative); p. 17: "the symbol '/' (slash) should follow each modifier in the following order: First: modifier N ... Second: modifier HRP ... Third: modifier I ... Fourth: modifier S ... Fifth: modifier G ... Sixth: modifier E"; Table 8 p. 18; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 1 Coronary CT Angiography (CCTA). Can Assoc Radiol J. 2024;75(3):488-501. doi:10.1177/08465371241233240 — p. 495 (PDF p. 8): HRP, I, E, S, G and N described; Rajiah PS, Alkadhi H, Andreini D, et al. Interpretation and reporting of coronary computed tomographic angiography (2026 update): an expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT). J Cardiovasc Comput Tomogr. 2026;20(5):459-482. doi:10.1016/j.jcct.2026.08.014 — §3.5 p. 479: stenosis, then P, then modifiers (N,HRP,I,S,G,E)
- **Proposed fix:** Write the modifiers with slashes after the P category, in CAD-RADS order N, HRP, I (I+, I− or I±), S, G, E (e.g. CAD-RADS 3/P3/HRP/S), and list N as a modifier too; the "+" prefix is not CAD-RADS notation.
- **Proposed home:** Coronary CT angiography › Reporting

### B3-cardiac-ct-ccta-11 · "High-Risk Plaque Features" tip

- **Verdict:** wrong · **management**
- **Kind:** guideline-threshold · **Topic:** Coronary CT angiography
- **The page says:** "High-Risk Plaque Features: Low attenuation plaque (<30 HU), positive remodeling (RI >1.1), napkin-ring sign, spotty calcification"
- **Source:** Cury RC, Leipsic J, Abbara S, et al. CAD-RADS™ 2.0 - 2022 Coronary Artery Disease-Reporting and Data System: an expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT), the American College of Cardiology (ACC), the American College of Radiology (ACR), and the North America Society of Cardiovascular Imaging (NASCI). Radiol Cardiothorac Imaging. 2022;4(5):e220183. doi:10.1148/ryct.220183 (also J Cardiovasc Comput Tomogr. 2022;16(6):536-557 and JACC Cardiovasc Imaging 2022, doi:10.1016/j.jcmg.2022.07.002). — §3.3.4 pp. 13-14: "If a coronary plaque clearly demonstrates two or more high-risk features by CCTA, the modifier 'HRP' ... should be added"; Figure 15 p. 14: positive remodeling "Av/[(Ap + Ad)/2] >1.1", low attenuation plaque "internal attenuation less than 30 HU", "a combination of two or more high-risk features is necessary to designate the plaque as high-risk for CAD-RADS"; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 1 Coronary CT Angiography (CCTA). Can Assoc Radiol J. 2024;75(3):488-501. doi:10.1177/08465371241233240 — p. 495 (PDF p. 8): HRP "should be used when 2 or more high risk features are present, including spotty calcifications, low attenuation plaque (less than 30 Hounsfield Units), positive remodelling, and the napkin ring sign"; Rajiah PS, Alkadhi H, Andreini D, et al. Interpretation and reporting of coronary computed tomographic angiography (2026 update): an expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT). J Cardiovasc Comput Tomogr. 2026;20(5):459-482. doi:10.1016/j.jcct.2026.08.014 — §2.2.2 p. 463: "positive remodeling (outer vessel diameter >10% larger than the reference diameter), spotty calcification (diameter <3 mm), low-attenuation (<30 HU) and napkin-ring sign"
- **Proposed fix:** The four features and both numbers are right; add that HRP is coded only when one plaque shows two or more of them (CAD-RADS p. 13; CAR p. 495), and define spotty calcification (<3 mm, SCCT 2026 p. 463).
- **Proposed home:** Coronary CT angiography › Categories

### B3-cardiac-ct-ccta-12 · Troubleshooting, Motion Artifact: "Heart rate too high" row

- **Verdict:** correct
- **Kind:** troubleshooting · **Topic:** Coronary CT angiography
- **The page says:** "Heart rate too high | Administer additional beta-blocker; re-scan if feasible"
- **Source:** Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 1 Coronary CT Angiography (CCTA). Can Assoc Radiol J. 2024;75(3):488-501. doi:10.1177/08465371241233240 — Patient Preparation p. 491 (PDF p. 4): beta-blockers to a target heart rate by scanner type; Acquisition Protocols p. 491: "If a diagnostic quality study has not been obtained, the examination can be repeated"; Table 2 p. 492 (PDF p. 5): "5 mg intravenous metoprolol given with repeated checks of blood pressure and heart rate up to maximum of 25 mg", "If target heart rate is not reached after oral dose of metoprolol, can give additional intravenous metoprolol on CT table", with contraindications; Table 1 p. 490 (PDF p. 3), CCTA comment: with high heart rates despite beta blockers, widening the acquisition window and possibly retrospective gating; Rajiah PS, Alkadhi H, Andreini D, et al. Interpretation and reporting of coronary computed tomographic angiography (2026 update): an expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT). J Cardiovasc Comput Tomogr. 2026;20(5):459-482. doi:10.1016/j.jcct.2026.08.014 — §2.3.3 p. 472 and Table 4 p. 473: after acquisition, reconstruction in a different phase (often systole at higher heart rates), motion compensation, absolute-millisecond systolic reconstruction, ECG editing
- **Proposed fix:** Optional: give CAR's limits (IV metoprolol 5 mg doses up to 25 mg; Table 2's contraindications) and, before re-scanning, try other phases or motion correction (SCCT 2026 Table 4).
- **Proposed home:** Coronary CT angiography › Technique

### B3-cardiac-ct-ccta-13 · Troubleshooting, Motion Artifact: "Irregular rhythm" row

- **Verdict:** correct
- **Kind:** troubleshooting · **Topic:** Coronary CT angiography
- **The page says:** "Irregular rhythm (AF, ectopy) | Switch to retrospective helical with multisegment reconstruction; use wider padding windows"
- **Source:** Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 1 Coronary CT Angiography (CCTA). Can Assoc Radiol J. 2024;75(3):488-501. doi:10.1177/08465371241233240 — p. 489 (PDF p. 2): retrospective gating costs more dose; 320-row single-rotation scanners "are less susceptible to arrhythmias such as atrial fibrillation"; Table 1 p. 490 (widen the acquisition window, possibly retrospective gating); p. 491: "Retrospective ECG-gating should only be used when functional data is required, or the patient's heart rate cannot be reduced sufficiently"; Rajiah PS, Alkadhi H, Andreini D, et al. Interpretation and reporting of coronary computed tomographic angiography (2026 update): an expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT). J Cardiovasc Comput Tomogr. 2026;20(5):459-482. doi:10.1016/j.jcct.2026.08.014 — §2.3.3 pp. 472-473: multisegment reconstruction among the motion techniques; "Absolute millisecond systolic reconstruction further helps compensate for irregular heartbeats"; interpolation and duplication artifacts from premature beats mitigated with ECG editing; Figure 17 p. 475 (AF, systolic reconstruction at 250 ms)
- **Proposed fix:** Optional: add ECG editing for ectopic beats and absolute-millisecond systolic reconstruction for AF (SCCT 2026 p. 473), and that a wide-detector single-beat acquisition is less affected by AF (CAR p. 489).
- **Proposed home:** Coronary CT angiography › Technique

### B3-cardiac-ct-ccta-14 · Troubleshooting, Motion Artifact: "Poor breath-hold" and "Respiratory motion" rows

- **Verdict:** source-not-readable
- **Kind:** troubleshooting · **Topic:** Coronary CT angiography
- **The page says:** "Poor breath-hold | Shorter breath-hold protocol; supplemental O₂; patient coaching"; "Respiratory motion (diaphragm) | Re-scan; increase table speed; adjust breath-hold instruction"
- **Source:** Rajiah PS, Alkadhi H, Andreini D, et al. Interpretation and reporting of coronary computed tomographic angiography (2026 update): an expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT). J Cardiovasc Comput Tomogr. 2026;20(5):459-482. doi:10.1016/j.jcct.2026.08.014 — §2.3.3 p. 472: "Body and respiratory motion ... cannot be corrected with current reconstruction techniques"; Table 4 p. 473: "Respiratory or body motion | Repeat acquisition"; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 1 Coronary CT Angiography (CCTA). Can Assoc Radiol J. 2024;75(3):488-501. doi:10.1177/08465371241233240 — pp. 489-492 (PDF pp. 2-5): no breath-hold, oxygen or table-speed advice; Abbara S, Blanke P, Maroules CD, et al. SCCT guidelines for the performance and acquisition of coronary computed tomographic angiography: a report of the Society of Cardiovascular Computed Tomography Guidelines Committee, endorsed by NASCI. J Cardiovasc Comput Tomogr. 2016;10(6):435-449. doi:10.1016/j.jcct.2016.10.002 — The SCCT acquisition guideline (patient preparation); not readable
- **Proposed fix:** Keep "re-scan" (SCCT 2026 Table 4). Supplemental oxygen, a shorter breath-hold and faster table speed are in neither CAR 2024 nor SCCT 2026: check them against SCCT's 2016 acquisition guideline if a copy can be had, otherwise label them local practice or drop them.
- **Question for the owner:** Are supplemental oxygen and breath-hold coaching for CCTA your local practice? No readable source states them.
- **Proposed home:** Coronary CT angiography › Technique

### B3-cardiac-ct-ccta-15 · Troubleshooting, Contrast Issues: "Poor aortic enhancement (<250 HU)" row

- **Verdict:** correct
- **Kind:** guideline-threshold · **Topic:** Coronary CT angiography
- **The page says:** "Poor aortic enhancement (<250 HU) | Mistimed bolus, low output, slow injection | Re-time with test bolus; increase injection rate or contrast volume"
- **Source:** Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 1 Coronary CT Angiography (CCTA). Can Assoc Radiol J. 2024;75(3):488-501. doi:10.1177/08465371241233240 — Contrast Medium Administration p. 491 (PDF p. 4): "For CCTA, the optimal vascular enhancement is between 250 and 300 HU"; "an injection rate of 5 to 7 mL/s using an 18G size needle is recommended in an antecubital vein, preferably on the right"; "The timing of contrast administration should be determined by using a test injection or bolus tracking technique"; "Higher contrast injection rates are required in larger patients and pregnant women"; Rajiah PS, Alkadhi H, Andreini D, et al. Interpretation and reporting of coronary computed tomographic angiography (2026 update): an expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT). J Cardiovasc Comput Tomogr. 2026;20(5):459-482. doi:10.1016/j.jcct.2026.08.014 — §2.3.2 p. 472 (causes: large body size, slow circulation time, injection technique, extravasation) and Table 4 p. 473 (low-energy VMI, higher-level iterative reconstruction)
- **Proposed fix:** Optional: give CAR's target (250–300 HU) and injection (5–7 mL/s, 18G, right antecubital; test bolus or bolus tracking), and SCCT's salvage of an acquired scan (low-energy VMI, stronger iterative reconstruction).
- **Proposed home:** Coronary CT angiography › Technique

### B3-cardiac-ct-ccta-16 · Troubleshooting, Contrast Issues: "Right heart opacification inadequate (structural CT)" row

- **Verdict:** correct
- **Kind:** troubleshooting · **Topic:** Structural heart CT planning
- **The page says:** "Right heart opacification inadequate (structural CT) | Standard left-heart timing | Use longer contrast bolus add a delay phase"
- **Source:** Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — TTVR p. 7 (print p. 508): "The acquisition technique requires different contrast timing to allow evaluation of the right atrium and right ventricle. ECG gating is still essential"; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 1 Coronary CT Angiography (CCTA). Can Assoc Radiol J. 2024;75(3):488-501. doi:10.1177/08465371241233240 — Table 1 p. 490 (PDF p. 3): "Ventricular function | Biventricular contrast protocol required (triphasic injection)"; p. 491 (PDF p. 4): triphasic (contrast, diluted contrast, saline) reduces right atrial beam hardening "while maintaining ability to assess the right heart"; Hausleiter J, Stolz L, Lurz P, et al. Transcatheter tricuspid valve replacement. J Am Coll Cardiol. 2025;85(3):265-291. doi:10.1016/j.jacc.2024.10.071 — Cardiac computed tomography, p. 272: "optimized contrast enhancement of the right cardiac chambers (plus jugular veins in case of jugular access)"; delayed abdomen-pelvis phase for femoral access
- **Proposed fix:** Optional: mend the wording ("longer contrast bolus and a delayed phase") and name CAR's biventricular (triphasic) injection as the planned alternative.
- **Proposed home:** Structural heart CT planning › Technique

### B3-cardiac-ct-ccta-17 · Troubleshooting, Contrast Issues: "Streak artifact from contrast in SVC" row

- **Verdict:** correct
- **Kind:** troubleshooting · **Topic:** Coronary CT angiography
- **The page says:** "Streak artifact from contrast in SVC | Left antecubital access, high concentration in SVC | Use right arm; add saline dilution mix; delay scan start"
- **Source:** Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 1 Coronary CT Angiography (CCTA). Can Assoc Radiol J. 2024;75(3):488-501. doi:10.1177/08465371241233240 — p. 491 (PDF p. 4): antecubital vein "preferably on the right to avoid dense contrast in the left innominate vein causing beam-hardening (streak) artifact and obscuring vascular structures such as the aorta"; biphasic (contrast then saline) and triphasic (contrast, diluted contrast, saline) injection; with triphasic "Beam-hardening artifacts related to contrast in the right atrium are reduced"; Rajiah PS, Alkadhi H, Andreini D, et al. Interpretation and reporting of coronary computed tomographic angiography (2026 update): an expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT). J Cardiovasc Comput Tomogr. 2026;20(5):459-482. doi:10.1016/j.jcct.2026.08.014 — §2.3.4 p. 473 and Table 4: beam hardening from dense contrast; higher-level iterative reconstruction or high-energy VMI
- **Proposed fix:** Optional: CAR's reason for the right arm is dense contrast in the left innominate (brachiocephalic) vein; "delay scan start" is in neither CAR nor SCCT 2026 (a saline chaser and dilution are), and SCCT adds high-energy VMI or stronger iterative reconstruction after the scan.
- **Proposed home:** Coronary CT angiography › Technique

### B3-cardiac-ct-ccta-18 · Troubleshooting, Contrast Issues: "Contrast extravasation" row

- **Verdict:** wrong · **management**
- **Kind:** troubleshooting · **Topic:** Contrast extravasation
- **The page says:** "Contrast extravasation | IV infiltration | Abort scan; assess extent; reschedule"
- **Source:** ACR Committee on Drugs and Contrast Media. ACR Manual on Contrast Media 2026. Reston, VA: American College of Radiology; 2026. — Extravasation summary p. 16 (PDF p. 20) and Questions 3-5 pp. 17-19 (PDF pp. 21-23): examine for tenderness, swelling, erythema, paresthesia, range of finger motion and perfusion; elevate the limb above the heart; cold compresses initially; no routine hyaluronidase, steroid injection or aspiration; clear discharge instructions; surgical consultation for severe pain, progressive swelling or pain, decreased capillary refill, change in sensation, worsening range of motion, or skin ulceration or blistering, "not ... based on volume alone". The owner's batch 2 lead for extravasation
- **Proposed fix:** After stopping the injection: examine the limb, elevate it, apply cold compresses, give discharge instructions, and ask for surgical consultation on the ACR's warning signs (not on volume); link the contrast extravasation topic (B2-contrast-safety-30) rather than restate it. "Reschedule" is not in the ACR manual.
- **Proposed home:** Contrast extravasation › Management

### B3-cardiac-ct-ccta-19 · Troubleshooting, Contrast Issues: "Contrast reaction" row

- **Verdict:** not-lead · **management**
- **Kind:** troubleshooting · **Topic:** Prior contrast reaction
- **The page says:** "Contrast reaction | Allergy / prior reaction | Pre-medicate per institutional protocol; have emergency equipment available"
- **Source:** Byrne A, Macdonald DB, Kirkpatrick IDC, et al. CAR/CSACI Practice Guidance for Contrast Media Hypersensitivity. Can Assoc Radiol J. 2025;76(3):400-416. doi:10.1177/08465371241311253 — Recommendations pp. 9-11: Rec 2 (only a previous hypersensitivity reaction to the same type of agent is a risk factor; "There is insufficient evidence to support routine screening of other risk factors"); Rec 3 p. 9 (switching to a chemically different agent "is the single best protective measure"); Rec 5 p. 10 (steroid premedication for prior LOCM reactions: "This practice should be discontinued"); Rec 7 p. 11 (optional second-generation antihistamine at least 1 hour before after a mild reaction); Rec 10 p. 11 (anaphylaxis: another modality or a different agent, "Premedication is not recommended"). The owner's batch 2 lead (B2-contrast-safety-11); ACR Committee on Drugs and Contrast Media. ACR Manual on Contrast Media 2026. Reston, VA: American College of Radiology; 2026. — Patient Selection, p. 5 (PDF p. 8): "having equipment available to treat reactions"; Indications for Premedication pp. 7-8 (PDF pp. 10-11): premedication "may be considered"; Table 3 (management of acute reactions in adults) p. 110; Table 4 (equipment for contrast reaction kits) p. 118
- **Proposed fix:** For a prior reaction, follow the batch 2 lead (CAR/CSACI 2025): switch to a chemically different agent, no steroid premedication, optional antihistamine after a mild reaction; allergies to other things are not a reason to premedicate. Keep "have emergency equipment available" (ACR Table 4) and link the contrast topics rather than restate them.
- **Proposed home:** Prior contrast reaction › Management

### B3-cardiac-ct-ccta-20 · Troubleshooting, Image Quality: "Blooming from calcium / stents" row

- **Verdict:** wrong
- **Kind:** troubleshooting · **Topic:** Coronary CT angiography
- **The page says:** "Blooming from calcium / stents | Beam hardening | Use sharper reconstruction kernel; increase kV; iterative reconstruction"
- **Source:** Rajiah PS, Alkadhi H, Andreini D, et al. Interpretation and reporting of coronary computed tomographic angiography (2026 update): an expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT). J Cardiovasc Comput Tomogr. 2026;20(5):459-482. doi:10.1016/j.jcct.2026.08.014 — §2.3.5 p. 473: "Blooming artifact results from partial volume averaging within a voxel ... Blooming artifacts can be reduced with thinner sections, sharper reconstruction kernels, and some iterative reconstruction algorithms ... Wider window widths improve differentiation"; high-energy VMI; §2.3.4 p. 473: beam hardening is a separate artifact; Table 4 p. 473, Blooming: increase display window width, decrease section thickness, increase kernel sharpness, higher-level iterative reconstruction, high-energy VMI
- **Proposed fix:** Cause: partial-volume averaging (beam hardening is a separate artifact). Remedies per SCCT 2026 Table 4: sharper kernel, thinner sections, wider window, stronger iterative reconstruction, high-energy VMI on multi-energy scanners; "increase kV" is not in SCCT 2026.
- **Proposed home:** Coronary CT angiography › Technique

### B3-cardiac-ct-ccta-21 · Troubleshooting, Image Quality: "Noise / grainy images" row

- **Verdict:** correct
- **Kind:** troubleshooting · **Topic:** Coronary CT angiography
- **The page says:** "Noise / grainy images | Low tube current or high BMI | Increase mAs (or kVp); widen gating window; use iterative reconstruction"
- **Source:** Rajiah PS, Alkadhi H, Andreini D, et al. Interpretation and reporting of coronary computed tomographic angiography (2026 update): an expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT). J Cardiovasc Comput Tomogr. 2026;20(5):459-482. doi:10.1016/j.jcct.2026.08.014 — §2.3.1 p. 472: "Noise may result from large body size, suboptimal scan parameters (low tube output or low tube energy for a given body size), or ECG-based tube current modulation ... Noise can be reduced using thicker reconstructions, softer kernels, higher iterative reconstruction levels, or alternative VMI energy levels"; Table 4 p. 473; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 1 Coronary CT Angiography (CCTA). Can Assoc Radiol J. 2024;75(3):488-501. doi:10.1177/08465371241233240 — p. 491 (PDF p. 4): "Larger patients require a higher kVp"; iterative and deep-learning reconstruction reduce noise
- **Proposed fix:** Optional: add the after-scan options (thicker sections, softer kernel, stronger iterative reconstruction, VMI; SCCT 2026 Table 4) and name ECG-based tube current modulation as a cause, which is what widening the full-dose window addresses.
- **Proposed home:** Coronary CT angiography › Technique

### B3-cardiac-ct-ccta-22 · Troubleshooting, Image Quality: "Mis-registration (coronary snap)" row

- **Verdict:** correct
- **Kind:** troubleshooting · **Topic:** Coronary CT angiography
- **The page says:** "Mis-registration (coronary snap) | Variable heart rate during helical scan | Retrospective gating with wider reconstruction window; manual phase selection"
- **Source:** Rajiah PS, Alkadhi H, Andreini D, et al. Interpretation and reporting of coronary computed tomographic angiography (2026 update): an expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT). J Cardiovasc Comput Tomogr. 2026;20(5):459-482. doi:10.1016/j.jcct.2026.08.014 — §2.3.3 p. 472: "Transition (stairstep or misalignment) artifacts occur at slab interfaces from different cardiac cycles, typically due to irregular rhythm or incorrect rhythm gating ... Blending or edge-correction algorithms can reduce their appearance ... Suspected pseudolesions may resolve on reconstruction at a different cardiac phase"; p. 473: interpolation and duplication artifacts in retrospectively gated spiral scans mitigated with ECG editing; Figure 16 p. 474; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 1 Coronary CT Angiography (CCTA). Can Assoc Radiol J. 2024;75(3):488-501. doi:10.1177/08465371241233240 — Table 1 p. 490 (PDF p. 3): widen the acquisition window or use retrospective gating when heart rates stay high
- **Proposed fix:** Optional: call it a transition (stair-step, misregistration) artifact, which also occurs in multi-beat step-and-shoot scans, and add ECG editing and edge correction (SCCT 2026 pp. 472-473); "coronary snap" is not a term the sources use.
- **Proposed home:** Coronary CT angiography › Technique

### B3-cardiac-ct-ccta-23 · Reporting Checklist, "CCTA" tab

- **Verdict:** wrong
- **Kind:** protocol · **Topic:** Coronary CT angiography
- **The page says:** "Coronary dominance"; "Proximal, mid, distal segments for each vessel"; "CAD-RADS classification + modifiers"; "Non-cardiac findings (lungs, mediastinum, liver)"
- **Source:** Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 1 Coronary CT Angiography (CCTA). Can Assoc Radiol J. 2024;75(3):488-501. doi:10.1177/08465371241233240 — Appendix A p. 498 (PDF p. 11), sample structured report: study indication, comparison, technique (ECG gating), medication, quality, coronary origins, dominance, left main, LAD, LCx and RCA with branches, incidental findings, conclusion ("most severe stenosis, extent of plaque, recommendations, significant incidental findings"); "The CAD-RADS score may be included but should not replace the conclusion"; Rajiah PS, Alkadhi H, Andreini D, et al. Interpretation and reporting of coronary computed tomographic angiography (2026 update): an expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT). J Cardiovasc Comput Tomogr. 2026;20(5):459-482. doi:10.1016/j.jcct.2026.08.014 — Table 6 pp. 478-479 (components of a comprehensive report: indication, ECG synchronization, medications, contrast, heart rate and rhythm, complications, overall quality and artifacts, calcium score if performed, dominance, anomalies, per-segment plaque and stenosis per CAD-RADS 2.0, overall plaque burden, stents, grafts, chambers, myocardium, valves, pericardium, great vessels, extracardiac findings, impression "in CAD-RADS 2.0 style" (Strong), recommendations, communication of urgent findings); §2.2.1 p. 462 and Table 1 p. 465 (LAD and RCA proximal, mid, distal; LCx proximal and distal; left main one segment); §2.5 p. 477 (extracardiac structures)
- **Proposed fix:** Add what CAR's sample report and SCCT Table 6 share: indication, technique and medication, image quality and artifacts, coronary origins and anomalies, plaque burden (P), stents and grafts, non-coronary cardiac findings, and a conclusion with recommendations; segments follow the SCCT model (LCx proximal and distal only, left main undivided).
- **Question for the owner:** CAR 2024 (Appendix A) says the CAD-RADS score "may be included but should not replace the conclusion"; SCCT 2026 (Table 6) strongly recommends a coronary impression in CAD-RADS 2.0 style. Should the site present CAD-RADS as optional beside a written conclusion (CAR) or as the expected impression (SCCT)?
- **Proposed home:** Coronary CT angiography › Reporting

### B3-cardiac-ct-ccta-24 · Reporting Checklist, "Structural / Device Planning" tab

- **Verdict:** correct
- **Kind:** protocol · **Topic:** Structural heart CT planning
- **The page says:** "Confirm adequate phase coverage (retrospective full-cycle)"; "Confirm adequate right and left heart opacification (if applicable)"; "Document annular measurements in correct cardiac phase"; "Assess vascular access route"; "Note any incidental findings"
- **Source:** Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 1 Coronary CT Angiography (CCTA). Can Assoc Radiol J. 2024;75(3):488-501. doi:10.1177/08465371241233240 — Table 1 p. 490 (PDF p. 3): retrospective ECG-gating for LAA closure, TAVI/TAVR, TMVR, TTVR and TPVR; "Some institutions only perform systolic phase imaging of the aortic annulus"; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — TAVI pp. 5-6 (print pp. 506-507): "Generally, a full cardiac cycle should be acquired", annulus sized in systole, diastolic phases helpful in reverse dynamism; bilateral minimal luminal diameters, calcification, tortuosity, alternative access; valve-in-valve: full cycle not always necessary; TMVR p. 7 (print p. 508): ECG gating, full cycle, delayed abdomen-pelvis imaging for venous access; TTVR p. 7: different contrast timing for the right atrium and ventricle; incidental non-cardiac findings pp. 11-12 (print pp. 512-513)
- **Proposed fix:** Optional: name the phase (systole for the TAVI annulus, CAR Part 2 p. 5) and the access measures (bilateral minimal luminal diameters, calcification, tortuosity; venous access for TMVR and TTVR); the device pages carry the detail.
- **Proposed home:** Structural heart CT planning › Reporting

### B3-cardiac-ct-ccta-25 · Front-page row (shared/data/resources.ts): title, version label and summary

- **Verdict:** correct
- **Kind:** listing · **Topic:** Coronary CT angiography
- **The page says:** Title "Coronary CT angiography and CAD-RADS", version "CAD-RADS 2.0", summary "CCTA reporting with CAD-RADS 2.0 categories, troubleshooting and a reporting checklist."
- **Source:** Cury RC, Leipsic J, Abbara S, et al. CAD-RADS™ 2.0 - 2022 Coronary Artery Disease-Reporting and Data System: an expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT), the American College of Cardiology (ACC), the American College of Radiology (ACR), and the North America Society of Cardiovascular Imaging (NASCI). Radiol Cardiothorac Imaging. 2022;4(5):e220183. doi:10.1148/ryct.220183 (also J Cardiovasc Comput Tomogr. 2022;16(6):536-557 and JACC Cardiovasc Imaging 2022, doi:10.1016/j.jcmg.2022.07.002). — Title and Table 8 p. 18: the 2022 version 2.0; Rajiah PS, Alkadhi H, Andreini D, et al. Interpretation and reporting of coronary computed tomographic angiography (2026 update): an expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT). J Cardiovasc Comput Tomogr. 2026;20(5):459-482. doi:10.1016/j.jcct.2026.08.014 — Introduction p. 460: reporting "standardized through CAD-RADS 2.0" (no newer version); Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 1 Coronary CT Angiography (CCTA). Can Assoc Radiol J. 2024;75(3):488-501. doi:10.1177/08465371241233240 — p. 492 (PDF p. 5): CAR adopts CAD-RADS 2.0 for CCTA reporting
- **Proposed fix:** Optional: the label names the version the page claims, and it is current. Once rebuilt, name CAR/CSTR 2024 Part 1 too; the summary fits (it could mention the structural planning checklist, or that checklist could move to the device pages).
- **Question for the owner:** Once the page follows CAR Part 1 for technique, should the front-page label read "CAR/CSTR 2024 · CAD-RADS 2.0" or stay "CAD-RADS 2.0"?
- **Proposed home:** Front page row: Coronary CT angiography and CAD-RADS

## TAVR planning CT

https://dfergs93.github.io/cardiac-imaging-resources/cardiac_ct/device_planning/tavr/

### B3-tavr-ct-01 · Opening sentence

- **Verdict:** correct
- **Kind:** teaching · **Topic:** TAVR planning CT
- **The page says:** "Pre-procedural CT is the essential imaging modality for TAVR candidate assessment." (The next sentence, the Protocol Manager link, is the site-wide line the coordinator records.)
- **Source:** Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — TAVR/TAVI, Pre-Procedure Planning: Native Aortic Valve, PDF p. 5 (p. 506): "ECG-gated cardiac CT is now considered the gold standard for selection of valve size and determining procedural risk"; Blanke P, Weir-McCall JR, Achenbach S, et al. Computed tomography imaging in the context of transcatheter aortic valve implantation (TAVI)/transcatheter aortic valve replacement (TAVR): an expert consensus document of the Society of Cardiovascular Computed Tomography. J Cardiovasc Comput Tomogr. 2019;13(1):1-20. doi:10.1016/j.jcct.2018.11.008. Co-published in JACC Cardiovasc Imaging. 2019;12(1):1-24. doi:10.1016/j.jcmg.2018.12.003. — Preamble/Introduction: "CT is now the gold standard tool for annular sizing, determination of risk of annular injury and coronary occlusion, and to provide co-planar fluoroscopic angle prediction"; Agricola E, Ancona F, Bartel T, et al. Multimodality imaging for patient selection, procedural guidance, and follow-up of transcatheter interventions for structural heart disease: a consensus document of the EACVI Task Force on Interventional Cardiovascular Imaging: part 1: access routes, transcatheter aortic valve implantation, and transcatheter mitral valve interventions. Eur Heart J Cardiovasc Imaging. 2023;24(9):e209-e268. doi:10.1093/ehjci/jead096 — TAVI, Computed tomography, p. e218: "CT is the first-line imaging technique for planning TAVI"
- **Proposed home:** TAVR planning CT › Background

### B3-tavr-ct-02 · Aortic Annulus Sizing: imaging plane and phase

- **Verdict:** wrong
- **Kind:** protocol · **Topic:** TAVR planning CT
- **The page says:** "Measure perpendicular to the LVOT outflow axis (coronal oblique through the three hinge points of the aortic cusps). Measure in systole (or the phase with the largest annular area)."
- **Source:** Blanke P, Weir-McCall JR, Achenbach S, et al. Computed tomography imaging in the context of transcatheter aortic valve implantation (TAVI)/transcatheter aortic valve replacement (TAVR): an expert consensus document of the Society of Cardiovascular Computed Tomography. J Cardiovasc Comput Tomogr. 2019;13(1):1-20. doi:10.1016/j.jcct.2018.11.008. Co-published in JACC Cardiovasc Imaging. 2019;12(1):1-24. doi:10.1016/j.jcmg.2018.12.003. — Aortic Annulus: Definitions and measurement techniques (the annulus is "the luminal contour within a virtual plane aligned with the most basal attachment points of the three aortic valve cusps"); Figure 6 (double-oblique alignment); Annular dynamism & phase selection ("the phase yielding the largest dimensions with adequate image quality"; avoid phases with blur or double contours); Table 5 ("Systolic measurements are preferred", strong); Francone M, Budde RPJ, Bremerich J, et al. CT and MR imaging prior to transcatheter aortic valve implantation: standardisation of scanning protocols, measurements and reporting—a consensus document by the European Society of Cardiovascular Radiology (ESCR). Eur Radiol. 2020;30(5):2627-2650. doi:10.1007/s00330-019-06357-8 — Essential aortic root assessment: "Standard coronal, sagittal or even single-oblique image reformations are therefore not considered suitable and lead to incorrect measurements"; Fig. 12 (stepwise double-oblique alignment); Required CT-derived measurements: "image quality prevails over cardiac phase selection"; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — PDF p. 5 (p. 506): the annulus "is generally largest in systole and it is this measurement that should be provided for valve sizing"; with reverse dynamism (septal hypertrophy) "diastolic phases may also be helpful"
- **Proposed fix:** Describe the annular plane as a double-oblique plane through the three basal hinge points (ESCR calls coronal or single-oblique planes unsuitable), and the phase as the one with the largest, sharply depicted annulus (usually systole).
- **Proposed home:** TAVR planning CT › Measurement

### B3-tavr-ct-03 · Annulus table: perimeter- and area-derived diameter rows

- **Verdict:** wrong · **management**
- **Kind:** guideline-threshold · **Topic:** TAVR planning CT
- **The page says:** "Perimeter-derived D | Trace annular perimeter → D = P/π | Primary sizing metric"; "Area-derived D | Trace annular area → D = 2√(A/π) | Cross-check"
- **Source:** Blanke P, Weir-McCall JR, Achenbach S, et al. Computed tomography imaging in the context of transcatheter aortic valve implantation (TAVI)/transcatheter aortic valve replacement (TAVR): an expert consensus document of the Society of Cardiovascular Computed Tomography. J Cardiovasc Comput Tomogr. 2019;13(1):1-20. doi:10.1016/j.jcct.2018.11.008. Co-published in JACC Cardiovasc Imaging. 2019;12(1):1-24. doi:10.1016/j.jcmg.2018.12.003. — Sizing considerations: "balloon expandable devices are largely sized on the basis of annular area, with self-expandable devices relying on perimeter"; Oversizing: "Both annular area and perimeter are clinically acceptable"; Table 5: "Area and perimeter measurements are preferred ... and should be provided in the report" (strong); Agricola E, Ancona F, Bartel T, et al. Multimodality imaging for patient selection, procedural guidance, and follow-up of transcatheter interventions for structural heart disease: a consensus document of the EACVI Task Force on Interventional Cardiovascular Imaging: part 1: access routes, transcatheter aortic valve implantation, and transcatheter mitral valve interventions. Eur Heart J Cardiovasc Imaging. 2023;24(9):e209-e268. doi:10.1093/ehjci/jead096 — TAVI, Aortic annulus sizing, p. e218: "perimeter- (SE valves) and area-derived (BE valves) diameters are used for this purpose"; Francone M, Budde RPJ, Bremerich J, et al. CT and MR imaging prior to transcatheter aortic valve implantation: standardisation of scanning protocols, measurements and reporting—a consensus document by the European Society of Cardiovascular Radiology (ESCR). Eur Radiol. 2020;30(5):2627-2650. doi:10.1007/s00330-019-06357-8 — Planimetry of the annular plane: DA = 2 × √(A / π) and DC = C/π; sizing algorithms "are not strictly interchangeable" between valve types
- **Proposed fix:** Keep both formulas (both are right) but give area and perimeter equal standing: area is the sizing measure for balloon-expandable valves, perimeter for self-expanding valves; drop "Primary sizing metric" and "Cross-check".
- **Proposed home:** TAVR planning CT › Measurement

### B3-tavr-ct-04 · Annulus table: max/min diameter and annular area rows; first sentence of the "Sizing convention" box

- **Verdict:** correct
- **Kind:** protocol · **Topic:** TAVR planning CT
- **The page says:** "Max / Min diameter | Widest and narrowest annular diameters | Assess eccentricity"; "Annular area | Planimetry | Directly guides device selection"; box: "Area- and perimeter-derived diameters are preferred over simple 2D max/min diameters for device selection."
- **Source:** Blanke P, Weir-McCall JR, Achenbach S, et al. Computed tomography imaging in the context of transcatheter aortic valve implantation (TAVI)/transcatheter aortic valve replacement (TAVR): an expert consensus document of the Society of Cardiovascular Computed Tomography. J Cardiovasc Comput Tomogr. 2019;13(1):1-20. doi:10.1016/j.jcct.2018.11.008. Co-published in JACC Cardiovasc Imaging. 2019;12(1):1-24. doi:10.1016/j.jcmg.2018.12.003. — Aortic Annulus: Definitions and measurement techniques ("short and long axis dimensions inform on the eccentricity"; "manual caliper measurements should not be used to assess overall annular dimensions instead of contouring tools"); Sizing considerations (diameter-based sizing "can be considered obsolete"); Table 5 (strong); Table 9 ("Optional min and max diameter"); Agricola E, Ancona F, Bartel T, et al. Multimodality imaging for patient selection, procedural guidance, and follow-up of transcatheter interventions for structural heart disease: a consensus document of the EACVI Task Force on Interventional Cardiovascular Imaging: part 1: access routes, transcatheter aortic valve implantation, and transcatheter mitral valve interventions. Eur Heart J Cardiovasc Imaging. 2023;24(9):e209-e268. doi:10.1093/ehjci/jead096 — TAVI, Computed tomography, p. e220: LAX and SAX diameters, area, perimeter and the three derived mean diameters "should all be reported"
- **Proposed home:** TAVR planning CT › Measurement

### B3-tavr-ct-05 · Annulus table: LVOT diameter row

- **Verdict:** unsourced
- **Kind:** protocol · **Topic:** TAVR planning CT
- **The page says:** "LVOT D (3–5 mm below annulus) | Perpendicular measurement | CoreValve sizing; LVOT obstruction risk"
- **Source:** Blanke P, Weir-McCall JR, Achenbach S, et al. Computed tomography imaging in the context of transcatheter aortic valve implantation (TAVI)/transcatheter aortic valve replacement (TAVR): an expert consensus document of the Society of Cardiovascular Computed Tomography. J Cardiovasc Comput Tomogr. 2019;13(1):1-20. doi:10.1016/j.jcct.2018.11.008. Co-published in JACC Cardiovasc Imaging. 2019;12(1):1-24. doi:10.1016/j.jcmg.2018.12.003. — Landing zone calcium: the sub-annular zone ("upper 4-5mm of the LVOT where device gets into contact") is described for calcification, not measured as a diameter; Table 9 (report items) has no LVOT diameter; Francone M, Budde RPJ, Bremerich J, et al. CT and MR imaging prior to transcatheter aortic valve implantation: standardisation of scanning protocols, measurements and reporting—a consensus document by the European Society of Cardiovascular Radiology (ESCR). Eur Radiol. 2020;30(5):2627-2650. doi:10.1007/s00330-019-06357-8 — Table 4 "Overview of required measurements": no LVOT diameter; Table 2: Evolut sizing by annular range
- **Proposed fix:** Drop the row, or replace it with SCCT's sub-annular calcium description (upper 4–5 mm of the LVOT: extent, protruding or flat, and which cusp it lies under).
- **Question for the owner:** No readable TAVR document uses an LVOT diameter 3–5 mm below the annulus for CoreValve sizing or for LVOT obstruction risk. Is it local practice to keep (labelled), or should it go?
- **Proposed home:** TAVR planning CT › Measurement

### B3-tavr-ct-06 · "Sizing convention" box: eccentricity index

- **Verdict:** unsourced
- **Kind:** guideline-threshold · **Topic:** TAVR planning CT
- **The page says:** "Eccentricity index = (max D − min D) / max D; values >0.10 indicate significant eccentricity."
- **Source:** Blanke P, Weir-McCall JR, Achenbach S, et al. Computed tomography imaging in the context of transcatheter aortic valve implantation (TAVI)/transcatheter aortic valve replacement (TAVR): an expert consensus document of the Society of Cardiovascular Computed Tomography. J Cardiovasc Comput Tomogr. 2019;13(1):1-20. doi:10.1016/j.jcct.2018.11.008. Co-published in JACC Cardiovasc Imaging. 2019;12(1):1-24. doi:10.1016/j.jcmg.2018.12.003. — Aortic Annulus: Definitions and measurement techniques: eccentricity is read from the short and long axis dimensions; no index or cut-off is given; Francone M, Budde RPJ, Bremerich J, et al. CT and MR imaging prior to transcatheter aortic valve implantation: standardisation of scanning protocols, measurements and reporting—a consensus document by the European Society of Cardiovascular Radiology (ESCR). Eur Radiol. 2020;30(5):2627-2650. doi:10.1007/s00330-019-06357-8 — Planimetry of the annular plane: the gap between DCS, DA and DC grows with eccentricity; no index or cut-off is given
- **Proposed fix:** Drop the >0.10 cut-off (or trace it to a research paper) and keep "short and long axis diameters show the eccentricity" (SCCT).
- **Question for the owner:** Is the eccentricity index with a >0.10 cut-off used locally? No readable guideline states it.
- **Proposed home:** TAVR planning CT › Measurement

### B3-tavr-ct-07 · Aortic Root table: sinus of Valsalva row

- **Verdict:** unsourced
- **Kind:** normal-values · **Topic:** TAVR planning CT
- **The page says:** "Sinus of Valsalva | Max width across each cusp (L, R, N) | Must accommodate device; typically 27–35 mm"
- **Source:** Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — PDF p. 5 (p. 506): sinus of Valsalva size "(commissure to cusp)" should be recorded in all TAVR CTs; "small sinus of Valsalva diameters (<30 mm) are associated with increased risk of coronary occlusion"; Blanke P, Weir-McCall JR, Achenbach S, et al. Computed tomography imaging in the context of transcatheter aortic valve implantation (TAVI)/transcatheter aortic valve replacement (TAVR): an expert consensus document of the Society of Cardiovascular Computed Tomography. J Cardiovasc Comput Tomogr. 2019;13(1):1-20. doi:10.1016/j.jcct.2018.11.008. Co-published in JACC Cardiovasc Imaging. 2019;12(1):1-24. doi:10.1016/j.jcmg.2018.12.003. — Coronary ostial height and Sinus of Valsalva assessment and Figure 7: three cusp-to-commissure calipers parallel to the annular plane, averaged when symmetric; Table 5 (mean SOV diameter, strong); Francone M, Budde RPJ, Bremerich J, et al. CT and MR imaging prior to transcatheter aortic valve implantation: standardisation of scanning protocols, measurements and reporting—a consensus document by the European Society of Cardiovascular Radiology (ESCR). Eur Radiol. 2020;30(5):2627-2650. doi:10.1007/s00330-019-06357-8 — Largest dimensions of the aortic sinus and sinotubular junction: the necessary sinus dimensions "are specified by the manufacturer of the specific device ... and varies from model to model"; Agricola E, Ancona F, Bartel T, et al. Multimodality imaging for patient selection, procedural guidance, and follow-up of transcatheter interventions for structural heart disease: a consensus document of the EACVI Task Force on Interventional Cardiovascular Imaging: part 1: access routes, transcatheter aortic valve implantation, and transcatheter mitral valve interventions. Eur Heart J Cardiovasc Imaging. 2023;24(9):e209-e268. doi:10.1093/ehjci/jead096 — p. e220: report the diastolic inner-edge-to-inner-edge maximum SOV diameters
- **Proposed fix:** Measure each sinus cusp to commissure parallel to the annular plane and report the three (mean if symmetric); drop "typically 27–35 mm" (no source) and say a mean below 30 mm raises the risk of coronary occlusion (CAR, p. 506).
- **Proposed home:** TAVR planning CT › Measurement

### B3-tavr-ct-08 · Aortic Root table: sinotubular junction row

- **Verdict:** wrong · **management**
- **Kind:** teaching · **Topic:** TAVR planning CT
- **The page says:** "Sinotubular junction (STJ) | Diameter | Narrow STJ constrains self-expanding devices"
- **Source:** Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — PDF p. 5 (p. 506): "A small STJ, particularly for balloon expandable valves, can be associated with risk of STJ injury"; STJ size and height should be recorded in all CTs; Blanke P, Weir-McCall JR, Achenbach S, et al. Computed tomography imaging in the context of transcatheter aortic valve implantation (TAVI)/transcatheter aortic valve replacement (TAVR): an expert consensus document of the Society of Cardiovascular Computed Tomography. J Cardiovasc Comput Tomogr. 2019;13(1):1-20. doi:10.1016/j.jcct.2018.11.008. Co-published in JACC Cardiovasc Imaging. 2019;12(1):1-24. doi:10.1016/j.jcmg.2018.12.003. — Sinotubular junction: "In particular when using balloon-expandable devices in low STJ height anatomies, STJ diameter should be compared to the anticipated THV size"; Table 5: "STJ height and diameter" (strong); Figure 7 (how to measure both); Agricola E, Ancona F, Bartel T, et al. Multimodality imaging for patient selection, procedural guidance, and follow-up of transcatheter interventions for structural heart disease: a consensus document of the EACVI Task Force on Interventional Cardiovascular Imaging: part 1: access routes, transcatheter aortic valve implantation, and transcatheter mitral valve interventions. Eur Heart J Cardiovasc Imaging. 2023;24(9):e209-e268. doi:10.1093/ehjci/jead096 — p. e218: STJ <22 mm with annular height <10 mm and calcification "may predispose to STJ injury"
- **Proposed fix:** Measure STJ diameter and height; a STJ narrower than the planned valve, especially with a balloon-expandable valve and a low STJ, raises the risk of STJ injury (CAR p. 506; SCCT).
- **Proposed home:** TAVR planning CT › Measurement

### B3-tavr-ct-09 · Aortic Root table: ascending aorta row, the stated purpose

- **Verdict:** unsourced
- **Kind:** teaching · **Topic:** TAVR planning CT
- **The page says:** "Ascending aorta | Max diameter | Sheath compatibility; ..."
- **Source:** Blanke P, Weir-McCall JR, Achenbach S, et al. Computed tomography imaging in the context of transcatheter aortic valve implantation (TAVI)/transcatheter aortic valve replacement (TAVR): an expert consensus document of the Society of Cardiovascular Computed Tomography. J Cardiovasc Comput Tomogr. 2019;13(1):1-20. doi:10.1016/j.jcct.2018.11.008. Co-published in JACC Cardiovasc Imaging. 2019;12(1):1-24. doi:10.1016/j.jcmg.2018.12.003. — Ascending aorta: "should be assessed for the presence of aortopathy" on double-oblique reformats; Figure 7 (at the widest level or at the main pulmonary artery); Aorta: aneurysm and calcification (cross-clamping); Francone M, Budde RPJ, Bremerich J, et al. CT and MR imaging prior to transcatheter aortic valve implantation: standardisation of scanning protocols, measurements and reporting—a consensus document by the European Society of Cardiovascular Radiology (ESCR). Eur Radiol. 2020;30(5):2627-2650. doi:10.1007/s00330-019-06357-8 — Types of valvular devices and access sites: "a BE device can be considered when patients have a dilated ascending aorta (> 43 mm)"
- **Proposed fix:** Replace "Sheath compatibility" with what the documents give: aortopathy and calcification (SCCT), and device choice (ESCR: a balloon-expandable valve can be considered when the ascending aorta is >43 mm).
- **Proposed home:** TAVR planning CT › Measurement

### B3-tavr-ct-10 · Aortic Root table: ascending aorta row, 45 mm in a bicuspid valve

- **Verdict:** correct
- **Kind:** guideline-threshold · **Topic:** TAVR planning CT
- **The page says:** "≥45 mm = surgical threshold (bicuspid)"
- **Source:** Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — Section 5.1.2.1, Recommendations for Intervention: Replacement of the Aorta in Patients With a BAV, rec. 3 (2a, B-NR), p. e111: with indications for SAVR and sinuses or ascending aorta ≥4.5 cm, replacement is reasonable at a Comprehensive Valve Center; rec. 1 (p. e110): >5.5 cm on its own; Praz F, Borger MA, Lanz J, et al. 2025 ESC/EACTS Guidelines for the management of valvular heart disease. Eur Heart J. 2025;46(44):4635-4736. doi:10.1093/eurheartj/ehaf194 (co-published in Eur J Cardiothorac Surg. 2025;67(8):ezaf276. doi:10.1093/ejcts/ezaf276). — Section 7.4, p. 28: with an established indication for aortic valve surgery, concomitant root or ascending surgery "should be considered at a diameter of ≥45 mm", "more clearly demonstrated in patients with BAV"; Figure 5 footnote b, p. 27
- **Proposed fix:** Say what the 45 mm means: in a bicuspid valve with an indication for valve surgery, concomitant aortic replacement is reasonable at ≥45 mm (ACC/AHA 2020; ESC/EACTS 2025), which can favour SAVR over TAVR; it is not a stand-alone surgical threshold.
- **Proposed home:** TAVR planning CT › Measurement

### B3-tavr-ct-11 · Aortic Root table: aortoventricular angle row

- **Verdict:** unsourced
- **Kind:** teaching · **Topic:** TAVR planning CT
- **The page says:** "Aortoventricular angle | LVOT-to-aorta angulation | Affects paravalvular leak risk and optimal fluoroscopic projection"
- **Source:** Francone M, Budde RPJ, Bremerich J, et al. CT and MR imaging prior to transcatheter aortic valve implantation: standardisation of scanning protocols, measurements and reporting—a consensus document by the European Society of Cardiovascular Radiology (ESCR). Eur Radiol. 2020;30(5):2627-2650. doi:10.1007/s00330-019-06357-8 — Types of valvular devices and access sites: "a BE device can be considered when patients have ... severely angulated aorta (aortoventricular angle > 70°)"; Non-endovascular approach: the apex-to-LVOT angle (transapical access) is the one tied to paravalvular regurgitation; Blanke P, Weir-McCall JR, Achenbach S, et al. Computed tomography imaging in the context of transcatheter aortic valve implantation (TAVI)/transcatheter aortic valve replacement (TAVR): an expert consensus document of the Society of Cardiovascular Computed Tomography. J Cardiovasc Comput Tomogr. 2019;13(1):1-20. doi:10.1016/j.jcct.2018.11.008. Co-published in JACC Cardiovasc Imaging. 2019;12(1):1-24. doi:10.1016/j.jcmg.2018.12.003. — No aortoventricular angle anywhere in the document
- **Proposed fix:** Restate as ESCR does (a steep aortoventricular angle, >70°, can favour a balloon-expandable valve) and drop the paravalvular leak and projection claims unless a source is found.
- **Proposed home:** TAVR planning CT › Measurement

### B3-tavr-ct-12 · Coronary ostial height: root-table row and the measuring instruction

- **Verdict:** correct
- **Kind:** protocol · **Topic:** TAVR planning CT
- **The page says:** Root table: "Coronary ostial heights | LCA and RCA from annular plane | See coronary occlusion risk below"; Coronary Occlusion Risk: "Measure coronary ostial height perpendicular to the annular plane."
- **Source:** Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — PDF p. 5 (p. 506): coronary ostial height "as measured perpendicular from the annular plane" should be recorded in all TAVR CTs; Blanke P, Weir-McCall JR, Achenbach S, et al. Computed tomography imaging in the context of transcatheter aortic valve implantation (TAVI)/transcatheter aortic valve replacement (TAVR): an expert consensus document of the Society of Cardiovascular Computed Tomography. J Cardiovasc Comput Tomogr. 2019;13(1):1-20. doi:10.1016/j.jcct.2018.11.008. Co-published in JACC Cardiovasc Imaging. 2019;12(1):1-24. doi:10.1016/j.jcmg.2018.12.003. — Coronary ostial height and Sinus of Valsalva assessment and Figure 7: caliper perpendicular to the annular plane to the lower edge of the LCA and RCA ostia; Table 5 (strong)
- **Proposed fix:** Add "to the lower edge of the ostium" (SCCT, Figure 7).
- **Proposed home:** TAVR planning CT › Measurement

### B3-tavr-ct-13 · Coronary Occlusion Risk table

- **Verdict:** wrong · **management**
- **Kind:** guideline-threshold · **Topic:** TAVR planning CT
- **The page says:** ">15 mm | Low | Standard TAVR planning"; "10–15 mm | Moderate | Consider BASILICA; evaluate sinus width"; "<10 mm | High | BASILICA or alternative approach; Heart Team discussion"
- **Source:** Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — PDF p. 5 (p. 506): "Low coronary ostial height (<12 mm) and small sinus of Valsalva diameters (<30 mm) are associated with increased risk of coronary occlusion"; Blanke P, Weir-McCall JR, Achenbach S, et al. Computed tomography imaging in the context of transcatheter aortic valve implantation (TAVI)/transcatheter aortic valve replacement (TAVR): an expert consensus document of the Society of Cardiovascular Computed Tomography. J Cardiovasc Comput Tomogr. 2019;13(1):1-20. doi:10.1016/j.jcct.2018.11.008. Co-published in JACC Cardiovasc Imaging. 2019;12(1):1-24. doi:10.1016/j.jcmg.2018.12.003. — Coronary ostial height and Sinus of Valsalva assessment: <12 mm and mean sinus <30 mm "connote an increased risk"; "there is no absolute threshold at which the procedure should be considered contra-indicated"; height "should not be considered as an isolated measure", but read with annulus, root and planned valve size; Agricola E, Ancona F, Bartel T, et al. Multimodality imaging for patient selection, procedural guidance, and follow-up of transcatheter interventions for structural heart disease: a consensus document of the EACVI Task Force on Interventional Cardiovascular Imaging: part 1: access routes, transcatheter aortic valve implantation, and transcatheter mitral valve interventions. Eur Heart J Cardiovasc Imaging. 2023;24(9):e209-e268. doi:10.1093/ehjci/jead096 — p. e218: "Coronary ostia height <12 mm is a risk factor for coronary occlusion, especially when associated with a heavily calcified valve, small SOV, and low annular height"; Francone M, Budde RPJ, Bremerich J, et al. CT and MR imaging prior to transcatheter aortic valve implantation: standardisation of scanning protocols, measurements and reporting—a consensus document by the European Society of Cardiovascular Radiology (ESCR). Eur Radiol. 2020;30(5):2627-2650. doi:10.1007/s00330-019-06357-8 — Minimum distance of the annulus to the coronary ostia: risk "considered to be low if this height is more than 10–14 mm"
- **Proposed fix:** Replace the three bands with CAR's statement (height <12 mm or mean sinus <30 mm raises the risk, read with the annulus, root, leaflet calcium and planned valve; no height rules TAVR in or out) and drop the BASILICA prompts, which no readable document ties to height bands; for stented valve-in-valve use the valve-to-coronary distance (B3-tavr-ct-23).
- **Question for the owner:** Are the 10 and 15 mm bands and the BASILICA prompts local practice? If not, they go in favour of CAR's 12 mm.
- **Proposed home:** TAVR planning CT › Management

### B3-tavr-ct-14 · Coronary Occlusion Risk: additional risk factors line

- **Verdict:** correct
- **Kind:** guideline-threshold · **Topic:** TAVR planning CT
- **The page says:** "Additional factors that increase risk regardless of height: narrow sinus of Valsalva (<30 mm), low STJ, bulky or fused leaflets, valve-in-valve procedures."
- **Source:** Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — PDF p. 5 (p. 506): sinus <30 mm; PDF p. 6 (p. 507): valve-in-valve coronary obstruction risk (VTC <4 mm; valve-to-STJ <3.5 mm); Blanke P, Weir-McCall JR, Achenbach S, et al. Computed tomography imaging in the context of transcatheter aortic valve implantation (TAVI)/transcatheter aortic valve replacement (TAVR): an expert consensus document of the Society of Cardiovascular Computed Tomography. J Cardiovasc Comput Tomogr. 2019;13(1):1-20. doi:10.1016/j.jcct.2018.11.008. Co-published in JACC Cardiovasc Imaging. 2019;12(1):1-24. doi:10.1016/j.jcmg.2018.12.003. — Coronary ostial height and Sinus of Valsalva assessment (mean sinus <30 mm); Valve-in-valve implantation, Overview (occlusion in 2.3% of ViV vs 0.66% of native TAVI); Agricola E, Ancona F, Bartel T, et al. Multimodality imaging for patient selection, procedural guidance, and follow-up of transcatheter interventions for structural heart disease: a consensus document of the EACVI Task Force on Interventional Cardiovascular Imaging: part 1: access routes, transcatheter aortic valve implantation, and transcatheter mitral valve interventions. Eur Heart J Cardiovasc Imaging. 2023;24(9):e209-e268. doi:10.1093/ehjci/jead096 — p. e218: heavily calcified valve, small SOV and low annular height add to the risk
- **Proposed fix:** Write "mean sinus diameter <30 mm" (SCCT) and point valve-in-valve readers to the valve-to-coronary distance instead of height (B3-tavr-ct-23).
- **Proposed home:** TAVR planning CT › Measurement

### B3-tavr-ct-15 · Bicuspid Aortic Valve + TAVR box

- **Verdict:** wrong
- **Kind:** teaching · **Topic:** TAVR planning CT
- **The page says:** "Note raphe type: Sievers 0 (no raphe), Sievers 1 (1 raphe), Sievers 2 (2 raphes). Eccentric or bulky calcification increases paravalvular leak and annular rupture risk. CT calcium scoring and geometric assessment (eccentricity index, calcium distribution) are essential. Coronary occlusion risk may be higher due to cusp fusion patterns."
- **Source:** Blanke P, Weir-McCall JR, Achenbach S, et al. Computed tomography imaging in the context of transcatheter aortic valve implantation (TAVI)/transcatheter aortic valve replacement (TAVR): an expert consensus document of the Society of Cardiovascular Computed Tomography. J Cardiovasc Comput Tomogr. 2019;13(1):1-20. doi:10.1016/j.jcct.2018.11.008. Co-published in JACC Cardiovasc Imaging. 2019;12(1):1-24. doi:10.1016/j.jcmg.2018.12.003. — Valve morphology: Sievers types by number of raphes (0, 1, 2); the TAVR-directed classification (tricommissural, bicommissural raphe-type, bicommissural non-raphe-type); raphe calcification graded, severe raphe calcium relates to paravalvular regurgitation; Table 5 (strong). Non-contrast cardiac CT: "Non-contrast evaluation of the aortic root is not an essential component of the TAVI/TAVR work-up"; a valve calcium score is for uncertain AS severity; Agricola E, Ancona F, Bartel T, et al. Multimodality imaging for patient selection, procedural guidance, and follow-up of transcatheter interventions for structural heart disease: a consensus document of the EACVI Task Force on Interventional Cardiovascular Imaging: part 1: access routes, transcatheter aortic valve implantation, and transcatheter mitral valve interventions. Eur Heart J Cardiovasc Imaging. 2023;24(9):e209-e268. doi:10.1093/ehjci/jead096 — Bicuspid aortic valve, p. e223: the simplified classification; heavily calcified leaflets, asymmetric calcium and "unusual orientation of the coronary ostia"; avoid aggressive oversizing; Francone M, Budde RPJ, Bremerich J, et al. CT and MR imaging prior to transcatheter aortic valve implantation: standardisation of scanning protocols, measurements and reporting—a consensus document by the European Society of Cardiovascular Radiology (ESCR). Eur Radiol. 2020;30(5):2627-2650. doi:10.1007/s00330-019-06357-8 — Amount, location and distribution of valvular calcifications: eccentric landing-zone calcium and paravalvular leak; severe calcium and annular rupture with balloon expansion
- **Proposed fix:** Keep the Sievers types and the calcium sentence, add SCCT's TAVR-directed classification and raphe calcium grading, and drop "CT calcium scoring ... essential" (a valve calcium score is for uncertain AS severity) and the eccentricity index.
- **Proposed home:** TAVR planning CT › Measurement

### B3-tavr-ct-16 · Vascular Access table: common femoral and iliofemoral diameters

- **Verdict:** not-lead
- **Kind:** guideline-threshold · **Topic:** TAVR planning CT
- **The page says:** "CFA (transfemoral) | ≥5.5–6.0 mm (device-dependent) | Preferred route — assess full iliofemoral runoff"; "Iliofemoral vessels | ≥5.5 mm | Assess tortuosity, calcification, occlusions"
- **Source:** Blanke P, Weir-McCall JR, Achenbach S, et al. Computed tomography imaging in the context of transcatheter aortic valve implantation (TAVI)/transcatheter aortic valve replacement (TAVR): an expert consensus document of the Society of Cardiovascular Computed Tomography. J Cardiovasc Comput Tomogr. 2019;13(1):1-20. doi:10.1016/j.jcct.2018.11.008. Co-published in JACC Cardiovasc Imaging. 2019;12(1):1-24. doi:10.1016/j.jcmg.2018.12.003. — Vascular access, Overview: "Given the continuous evolution of delivery systems, no reference is made to current devices and vessel diameter requirements"; risk when the sheath's external diameter exceeds the minimal artery diameter; sheath-to-artery ratio ≥1.05 in early work, ≥1.12 with newer sheaths; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — PDF p. 6 (p. 507): minimal luminal diameters bilaterally, including the access point at the common femoral artery, with calcification and tortuosity; no diameter given; Francone M, Budde RPJ, Bremerich J, et al. CT and MR imaging prior to transcatheter aortic valve implantation: standardisation of scanning protocols, measurements and reporting—a consensus document by the European Society of Cardiovascular Radiology (ESCR). Eur Radiol. 2020;30(5):2627-2650. doi:10.1007/s00330-019-06357-8 — Evaluation of the access route: "Depending on the chosen delivery system and THV size, the minimal vessel diameter can be as low as 5.5 mm"; transfemoral is the approach of preference; Agricola E, Ancona F, Bartel T, et al. Multimodality imaging for patient selection, procedural guidance, and follow-up of transcatheter interventions for structural heart disease: a consensus document of the EACVI Task Force on Interventional Cardiovascular Imaging: part 1: access routes, transcatheter aortic valve implantation, and transcatheter mitral valve interventions. Eur Heart J Cardiovasc Imaging. 2023;24(9):e209-e268. doi:10.1093/ehjci/jead096 — Procedural access assessment, p. e221: peripheral vessels "should be at least 6 mm with little tortuosity, no severe stenosis, or calcifications" for 14–20 F systems
- **Proposed fix:** Lead with SCCT's rule (the minimal luminal diameter on each side against the outer diameter of the planned sheath) and give 5.5–6 mm only as ESCR/EACVI's typical figures for current systems.
- **Question for the owner:** Keep the typical diameters (5.5–6.0 mm, ESCR/EACVI) on the page, or give only the device-specific sheath comparison, as SCCT does?
- **Proposed home:** TAVR planning CT › Measurement

### B3-tavr-ct-17 · Vascular Access table: subclavian/axillary row

- **Verdict:** unsourced
- **Kind:** guideline-threshold · **Topic:** TAVR planning CT
- **The page says:** "Subclavian / axillary | ≥6.0 mm (left preferred) | Alternative if femoral unfavorable"
- **Source:** Blanke P, Weir-McCall JR, Achenbach S, et al. Computed tomography imaging in the context of transcatheter aortic valve implantation (TAVI)/transcatheter aortic valve replacement (TAVR): an expert consensus document of the Society of Cardiovascular Computed Tomography. J Cardiovasc Comput Tomogr. 2019;13(1):1-20. doi:10.1016/j.jcct.2018.11.008. Co-published in JACC Cardiovasc Imaging. 2019;12(1):1-24. doi:10.1016/j.jcmg.2018.12.003. — Alternate access: subclavian and carotid reported with the same techniques as iliofemoral; "an left-sided approach is preferred for subclavian access"; no diameter; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — PDF p. 6 (p. 507): if femoral access is unfavourable, similar measures of the right and left subclavian and carotid arteries; Agricola E, Ancona F, Bartel T, et al. Multimodality imaging for patient selection, procedural guidance, and follow-up of transcatheter interventions for structural heart disease: a consensus document of the EACVI Task Force on Interventional Cardiovascular Imaging: part 1: access routes, transcatheter aortic valve implantation, and transcatheter mitral valve interventions. Eur Heart J Cardiovasc Imaging. 2023;24(9):e209-e268. doi:10.1093/ehjci/jead096 — Subclavian, p. e222: calibre, calcification and tortuosity; the right side is challenging when the valve plane is ≥30° to the horizontal; no diameter
- **Proposed fix:** Drop "≥6.0 mm" (or state it as the planned sheath's requirement), keep "left preferred" (SCCT), and add the carotid route CAR names.
- **Proposed home:** TAVR planning CT › Measurement

### B3-tavr-ct-18 · Vascular Access table: transaortic and transapical rows

- **Verdict:** correct
- **Kind:** teaching · **Topic:** TAVR planning CT
- **The page says:** "Transaortic | Direct ascending aorta access | Reserved for prohibitive femoral/subclavian anatomy"; "Transapical | Direct LV apex | Avoided when possible; only if all others unsuitable"
- **Source:** Agricola E, Ancona F, Bartel T, et al. Multimodality imaging for patient selection, procedural guidance, and follow-up of transcatheter interventions for structural heart disease: a consensus document of the EACVI Task Force on Interventional Cardiovascular Imaging: part 1: access routes, transcatheter aortic valve implantation, and transcatheter mitral valve interventions. Eur Heart J Cardiovasc Imaging. 2023;24(9):e209-e268. doi:10.1093/ehjci/jead096 — Non-femoral access routes, p. e222: transaortic and transapical "require a surgical approach and are therefore less commonly used"; porcelain aorta makes transaortic unsuitable; key point (iv), p. e223: other routes carry higher complexity and risk than transfemoral; Francone M, Budde RPJ, Bremerich J, et al. CT and MR imaging prior to transcatheter aortic valve implantation: standardisation of scanning protocols, measurements and reporting—a consensus document by the European Society of Cardiovascular Radiology (ESCR). Eur Radiol. 2020;30(5):2627-2650. doi:10.1007/s00330-019-06357-8 — Evaluation of the access route and Non-endovascular approach: transfemoral first; transaortic entry about 6 cm above the annulus; transapical needs a normal apex and chest wall
- **Proposed home:** TAVR planning CT › Measurement

### B3-tavr-ct-19 · Vascular Access: key measurements line (diameter and sheath ratio)

- **Verdict:** correct
- **Kind:** protocol · **Topic:** TAVR planning CT
- **The page says:** "Key measurements: Minimum luminal diameter at each level; ... sheath outer diameter vs vessel diameter ratio."
- **Source:** Blanke P, Weir-McCall JR, Achenbach S, et al. Computed tomography imaging in the context of transcatheter aortic valve implantation (TAVI)/transcatheter aortic valve replacement (TAVR): an expert consensus document of the Society of Cardiovascular Computed Tomography. J Cardiovasc Comput Tomogr. 2019;13(1):1-20. doi:10.1016/j.jcct.2018.11.008. Co-published in JACC Cardiovasc Imaging. 2019;12(1):1-24. doi:10.1016/j.jcmg.2018.12.003. — Table 7 (strong): minimal luminal diameter of both iliofemoral systems to the puncture site, all >270° calcification, anterior calcification at the puncture site; Quantification of luminal dimensions (perpendicular to the vessel at the tightest point); Overview (sheath-to-artery ratio ≥1.05 / ≥1.12); Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — PDF p. 6 (p. 507): minimal diameters bilaterally, circumferential calcification, tortuosity
- **Proposed fix:** Give SCCT's ratio thresholds (≥1.05 in early work, ≥1.12 with current sheaths) and add >270° calcification and anterior calcification at the puncture site, which SCCT asks to be reported.
- **Proposed home:** TAVR planning CT › Measurement

### B3-tavr-ct-20 · Vascular Access: iliofemoral angle

- **Verdict:** unsourced
- **Kind:** guideline-threshold · **Topic:** TAVR planning CT
- **The page says:** "iliofemoral angle >90° = higher vascular complication risk"
- **Source:** Francone M, Budde RPJ, Bremerich J, et al. CT and MR imaging prior to transcatheter aortic valve implantation: standardisation of scanning protocols, measurements and reporting—a consensus document by the European Society of Cardiovascular Radiology (ESCR). Eur Radiol. 2020;30(5):2627-2650. doi:10.1007/s00330-019-06357-8 — Endovascular approach: "At present, specific cut-offs for the definition of tortuosity degree or extent of calcifications have not been established"; Blanke P, Weir-McCall JR, Achenbach S, et al. Computed tomography imaging in the context of transcatheter aortic valve implantation (TAVI)/transcatheter aortic valve replacement (TAVR): an expert consensus document of the Society of Cardiovascular Computed Tomography. J Cardiovasc Comput Tomogr. 2019;13(1):1-20. doi:10.1016/j.jcct.2018.11.008. Co-published in JACC Cardiovasc Imaging. 2019;12(1):1-24. doi:10.1016/j.jcmg.2018.12.003. — Tortuosity: assessed visually on volume renderings; calcified tortuous segments carry a substantial risk of access failure; no angle given
- **Proposed fix:** Drop the 90° cut-off; describe tortuosity in words and flag calcified tortuous segments (SCCT).
- **Question for the owner:** Is the >90° iliofemoral angle a local rule? ESCR says no tortuosity cut-off has been established.
- **Proposed home:** TAVR planning CT › Measurement

### B3-tavr-ct-21 · Fluoroscopic Projection Planning

- **Verdict:** correct
- **Kind:** protocol · **Topic:** TAVR planning CT
- **The page says:** "CT can predict the optimal fluoroscopic working angle (coplanar view) by identifying the plane perpendicular to the aortic annulus. Report LAO/RAO and cranial/caudal angulations to the interventional team."
- **Source:** Blanke P, Weir-McCall JR, Achenbach S, et al. Computed tomography imaging in the context of transcatheter aortic valve implantation (TAVI)/transcatheter aortic valve replacement (TAVR): an expert consensus document of the Society of Cardiovascular Computed Tomography. J Cardiovasc Comput Tomogr. 2019;13(1):1-20. doi:10.1016/j.jcct.2018.11.008. Co-published in JACC Cardiovasc Imaging. 2019;12(1):1-24. doi:10.1016/j.jcmg.2018.12.003. — Optimal projection curve (report LAO/RAO with cranial/caudal; give alternatives when cranial or caudal angulation is >25°; valid only with similar chest position); Table 6 (provide angles, strong; if the patient was not supine, say so and give none, strong); Francone M, Budde RPJ, Bremerich J, et al. CT and MR imaging prior to transcatheter aortic valve implantation: standardisation of scanning protocols, measurements and reporting—a consensus document by the European Society of Cardiovascular Radiology (ESCR). Eur Radiol. 2020;30(5):2627-2650. doi:10.1007/s00330-019-06357-8 — Determination of optimal c-arm angulation: recommended in every report; limited when patient position differs
- **Proposed fix:** Add SCCT's two caveats: give alternatives when the cranial or caudal angulation exceeds 25°, and give no angles if the patient was not supine on the CT.
- **Proposed home:** TAVR planning CT › Reporting

### B3-tavr-ct-22 · Post-Procedural CT: leaflet thickening and motion

- **Verdict:** correct
- **Kind:** teaching · **Topic:** TAVR planning CT
- **The page says:** "CT is the reference standard for detecting hypo-attenuating leaflet thickening (HALT) and reduced leaflet motion (RELM) post-TAVR."
- **Source:** Budde RPJ, Faure ME, Abbara S, et al. Cardiac computed tomography for prosthetic heart valve assessment. An expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT), the American College of Cardiology (ACC), the European Society of Cardiovascular Radiology (ESCR), the North American Society of Cardiovascular Imaging (NASCI), the Radiological Society of North America (RSNA), the Society for Cardiovascular Angiography & Interventions (SCAI) and Society of Thoracic Surgeons (STS). J Cardiovasc Comput Tomogr. 2025;19(4):366-386. doi:10.1016/j.jcct.2025.04.007 — Table 1, p. 367: CT rated above echocardiography for HALT and RELM ("RELM = reduced leaflet motion"); §14, pp. 379–380: HALT definition, graded per leaflet in 4 tiers (25%, 25–50%, 50–75%, >75%), reduced leaflet motion assessed in systole for aortic valves; Blanke P, Weir-McCall JR, Achenbach S, et al. Computed tomography imaging in the context of transcatheter aortic valve implantation (TAVI)/transcatheter aortic valve replacement (TAVR): an expert consensus document of the Society of Cardiovascular Computed Tomography. J Cardiovasc Comput Tomogr. 2019;13(1):1-20. doi:10.1016/j.jcct.2018.11.008. Co-published in JACC Cardiovasc Imaging. 2019;12(1):1-24. doi:10.1016/j.jcmg.2018.12.003. — Post-TAVI/TAVR CT and Table 8: "At present, routine CT imaging following TAVI/TAVR is not recommended" (strong); CT for suspected valve thrombosis, endocarditis or degeneration; full cardiac cycle; describe location, length and thickness; motion present or absent; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — PDF p. 6 (p. 507): ECG-gated full-cycle imaging, tube-current modulation unnecessary, coverage of the heart; report HALT severity and restricted leaflet motion; Agricola E, Ancona F, Bartel T, et al. Multimodality imaging for patient selection, procedural guidance, and follow-up of transcatheter interventions for structural heart disease: a consensus document of the EACVI Task Force on Interventional Cardiovascular Imaging: part 1: access routes, transcatheter aortic valve implantation, and transcatheter mitral valve interventions. Eur Heart J Cardiovasc Imaging. 2023;24(9):e209-e268. doi:10.1093/ehjci/jead096 — CT and nuclear imaging, p. e232: CT "has a higher sensitivity to detect thrombosis than echocardiography"; four-tier HALT grading
- **Proposed fix:** Add that CT after TAVR is not routine but for suspected valve thrombosis, endocarditis or degeneration (SCCT 2019, Table 8), with full-cycle gated imaging and HALT graded per leaflet in four tiers (SCCT 2025).
- **Proposed home:** TAVR planning CT › Technique

### B3-tavr-ct-23 · Post-Procedural CT: valve-in-valve planning

- **Verdict:** correct
- **Kind:** teaching · **Topic:** TAVR planning CT
- **The page says:** "Also essential for valve-in-valve planning (inner diameter of implanted prosthesis, risk of coronary obstruction)."
- **Source:** Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — Pre-Procedure Planning: Valve in Valve, PDF p. 6 (p. 507): make and model of the surgical valve; coronary occlusion if the virtual valve-to-coronary distance (VTC) is <4 mm; a valve-to-STJ distance <3.5 mm "can indicate higher risk"; Blanke P, Weir-McCall JR, Achenbach S, et al. Computed tomography imaging in the context of transcatheter aortic valve implantation (TAVI)/transcatheter aortic valve replacement (TAVR): an expert consensus document of the Society of Cardiovascular Computed Tomography. J Cardiovasc Comput Tomogr. 2019;13(1):1-20. doi:10.1016/j.jcct.2018.11.008. Co-published in JACC Cardiovasc Imaging. 2019;12(1):1-24. doi:10.1016/j.jcmg.2018.12.003. — Valve-in-valve implantation (VTC <4 mm the only independent predictor; assess RCA and left main when the posts reach the ostia; stentless valves read as native; THV sizing from records or the internal ring); Table 8 (strong); Budde RPJ, Faure ME, Abbara S, et al. Cardiac computed tomography for prosthetic heart valve assessment. An expert consensus document of the Society of Cardiovascular Computed Tomography (SCCT), the American College of Cardiology (ACC), the European Society of Cardiovascular Radiology (ESCR), the North American Society of Cardiovascular Imaging (NASCI), the Radiological Society of North America (RSNA), the Society for Cardiovascular Angiography & Interventions (SCAI) and Society of Thoracic Surgeons (STS). J Cardiovasc Comput Tomogr. 2025;19(4):366-386. doi:10.1016/j.jcct.2025.04.007 — §15, p. 380: CT for coronary occlusion risk and sizing before a valve-in-valve procedure, referring to the SCCT TAVI document
- **Proposed fix:** Add CAR's numbers: a virtual valve-to-coronary distance <4 mm, or a valve-to-STJ distance <3.5 mm when the displaced leaflets could reach the STJ, means a higher risk of coronary obstruction (CAR p. 507; SCCT 2019).
- **Proposed home:** TAVR planning CT › Measurement

### B3-tavr-ct-24 · References box (citations and roles)

- **Verdict:** correct
- **Kind:** provenance · **Topic:** TAVR planning CT
- **The page says:** Blanke P, et al. "Computed Tomography Imaging in the Context of TAVI/TAVR: An Expert Consensus Document of the SCCT." JACC: Cardiovascular Imaging. 2019;12(1):1–24, DOI 10.1016/j.jcmg.2018.12.003, "Primary reference — current SCCT consensus; annular sizing, protocol, structured reporting, HALT detection"; Achenbach S, et al. ... J Cardiovasc Comput Tomogr. 2012;6(6):366–380, DOI 10.1016/j.jcct.2012.11.002, "Original landmark SCCT consensus"; Francone M, et al. ... European Radiology. 2020;30(5):2627–2650, DOI 10.1007/s00330-019-06357-8, "Radiology-centric complement; protocol harmonization across scanner platforms; structured reporting for Heart Valve Team". No CAR document is cited.
- **Source:** Blanke P, Weir-McCall JR, Achenbach S, et al. Computed tomography imaging in the context of transcatheter aortic valve implantation (TAVI)/transcatheter aortic valve replacement (TAVR): an expert consensus document of the Society of Cardiovascular Computed Tomography. J Cardiovasc Comput Tomogr. 2019;13(1):1-20. doi:10.1016/j.jcct.2018.11.008. Co-published in JACC Cardiovasc Imaging. 2019;12(1):1-24. doi:10.1016/j.jcmg.2018.12.003. — Citation as recorded (co-published JACC Cardiovasc Imaging 2019;12(1):1-24, doi 10.1016/j.jcmg.2018.12.003); Preamble (updates the 2012 document); Table 9 (report); Post-TAVI/TAVR CT; Achenbach S, Delgado V, Hausleiter J, et al. SCCT expert consensus document on computed tomography imaging before transcatheter aortic valve implantation (TAVI)/transcatheter aortic valve replacement (TAVR). J Cardiovasc Comput Tomogr. 2012;6(6):366-380. doi:10.1016/j.jcct.2012.11.002 — Not readable; its citation matches SCCT 2019's reference 1 (Achenbach S, ... J Cardiovasc Comput Tomogr. 2012;6(6):366-380, doi 10.1016/j.jcct.2012.11.002); Francone M, Budde RPJ, Bremerich J, et al. CT and MR imaging prior to transcatheter aortic valve implantation: standardisation of scanning protocols, measurements and reporting—a consensus document by the European Society of Cardiovascular Radiology (ESCR). Eur Radiol. 2020;30(5):2627-2650. doi:10.1007/s00330-019-06357-8 — Title and abstract key points (protocols across scanners, measurements, reporting template); citation as recorded; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — TAVR/TAVI section, pp. 505–507 (not cited by the page); reference 40, PDF p. 14 (p. 515), cites SCCT 2019
- **Proposed fix:** Add CAR/CSTR 2024 Part 2 as the lead for the numbers it gives (coronary height, sinus, oversizing, valve-in-valve), keep SCCT 2019 for the rest and the 2012 document as history, and consider SCCT 2025 for post-TAVR CT.
- **Proposed home:** TAVR planning CT › Applies to

### B3-tavr-ct-25 · Front-page row (shared/data/resources.ts, id tavr-ct)

- **Verdict:** correct
- **Kind:** listing · **Topic:** TAVR planning CT
- **The page says:** Title "TAVR planning CT", version "none", summary "Annulus sizing, root measurements, coronary risk, access and projections before TAVR."
- **Source:** Blanke P, Weir-McCall JR, Achenbach S, et al. Computed tomography imaging in the context of transcatheter aortic valve implantation (TAVI)/transcatheter aortic valve replacement (TAVR): an expert consensus document of the Society of Cardiovascular Computed Tomography. J Cardiovasc Comput Tomogr. 2019;13(1):1-20. doi:10.1016/j.jcct.2018.11.008. Co-published in JACC Cardiovasc Imaging. 2019;12(1):1-24. doi:10.1016/j.jcmg.2018.12.003. — The page's primary reference; covers annulus sizing, root measurements, coronary occlusion risk, vascular access and fluoroscopic projections (Tables 5–7)
- **Proposed fix:** The page states no version, so "none" is honest today; when it is rebuilt on CAR 2024 and SCCT 2019, the label should name them (owner signs off). The summary fits.
- **Proposed home:** Front page row: TAVR planning CT

## TMVR planning CT

https://dfergs93.github.io/cardiac-imaging-resources/cardiac_ct/device_planning/tmvr/

### B3-tmvr-ct-01 · Opening sentence

- **Verdict:** correct
- **Kind:** teaching · **Topic:** TMVR planning CT
- **The page says:** "CT is central to TMVR candidate selection and procedure planning, with neo-LVOT area serving as the gatekeeper measurement for procedural feasibility." (The Protocol Manager link after it is the site-wide line the coordinator records.)
- **Source:** Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — Transcatheter Mitral Valve Replacement (TMVR), PDF pp. 6–7 (pp. 507–508): replacement "extensively uses CT for pre-procedure planning"; the neo-LVOT "is essential in prediction of subvalvular left ventricular outflow tract obstruction risk"; Agricola E, Ancona F, Bartel T, et al. Multimodality imaging for patient selection, procedural guidance, and follow-up of transcatheter interventions for structural heart disease: a consensus document of the EACVI Task Force on Interventional Cardiovascular Imaging: part 1: access routes, transcatheter aortic valve implantation, and transcatheter mitral valve interventions. Eur Heart J Cardiovasc Imaging. 2023;24(9):e209-e268. doi:10.1093/ehjci/jead096 — TMVR, Patient selection and pre-procedural planning, p. e262: "CT is mandatory to confirm the suitability and for the procedural planning"; LVOT obstruction "is the most dreaded complication of TMVR"
- **Proposed home:** TMVR planning CT › Background

### B3-tmvr-ct-02 · Acquisition box: gating and cardiac-cycle coverage

- **Verdict:** correct
- **Kind:** protocol · **Topic:** TMVR planning CT
- **The page says:** "Retrospective ECG-gated full-cycle multiphase dataset required ... to enable neo-LVOT assessment across cardiac phases and select the optimal sizing phase"
- **Source:** Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — PDF p. 7 (p. 508): "CT protocol for TMVR planning is similar to TAVR, requiring ECG gating and full cardiac cycle acquisition. Since vascular access for these procedures is venous, delayed imaging of the abdomen and pelvis to the level of the femoral heads is required."; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 1 Coronary CT Angiography (CCTA). Can Assoc Radiol J. 2024;75(3):488-501. doi:10.1177/08465371241233240 — Table 1 "Common Indications and Scan Techniques", p. 490: TMVR marked for retrospective ECG-gating; "Consider no tube current modulation for better quality imaging"
- **Proposed fix:** Add CAR's other requirement, a delayed (venous) phase of the abdomen and pelvis to the femoral heads because access is venous, and CAR Part 1's advice to consider no tube-current modulation.
- **Proposed home:** TMVR planning CT › Technique

### B3-tmvr-ct-03 · Acquisition box: reconstruction interval

- **Verdict:** source-not-readable
- **Kind:** guideline-threshold · **Topic:** TMVR planning CT
- **The page says:** "(typically 5–10% R-R intervals)"
- **Source:** Pulerwitz TC, Khalique OK, Leb J, et al. Optimizing cardiac CT protocols for comprehensive acquisition prior to percutaneous MV and TV repair/replacement. JACC Cardiovasc Imaging. 2020;13(3):836-850. doi:10.1016/j.jcmg.2019.01.041 — Not readable (publisher site behind a Cloudflare check; owner asked for a copy); the page's protocol reference; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — PDF p. 7 (p. 508): no reconstruction interval for TMVR; Blanke P, Weir-McCall JR, Achenbach S, et al. Computed tomography imaging in the context of transcatheter aortic valve implantation (TAVI)/transcatheter aortic valve replacement (TAVR): an expert consensus document of the Society of Cardiovascular Computed Tomography. J Cardiovasc Comput Tomogr. 2019;13(1):1-20. doi:10.1016/j.jcct.2018.11.008. Co-published in JACC Cardiovasc Imaging. 2019;12(1):1-24. doi:10.1016/j.jcmg.2018.12.003. — Reconstruction Technique (for TAVI, not TMVR): intervals "≤10%" across the acquired cycle, or 50 ms absolute steps in arrhythmia
- **Proposed fix:** Check against Pulerwitz 2020 once a copy is read; until then the nearest readable advice is SCCT's for TAVI (≤10% intervals, or 50 ms steps in arrhythmia).
- **Proposed home:** TMVR planning CT › Technique

### B3-tmvr-ct-04 · Mitral Annulus Sizing: shape and phase (with the acquisition box's "end-systole for annulus")

- **Verdict:** source-not-readable
- **Kind:** guideline-threshold · **Topic:** TMVR planning CT
- **The page says:** "The mitral annulus is saddle-shaped and D-shaped — measure in end-systole when the annulus is smallest and most reproducible." Acquisition box: "end-systole for annulus; multiphase for neo-LVOT simulation".
- **Source:** Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — PDF pp. 6–7 (pp. 507–508): "The complex saddle shape of the annulus can be simplified into a “D” shape in a 2-dimensional plane on CT to assist in selection of TMVR size"; no phase given; Blanke P, Naoum C, Webb J, et al. Multimodality imaging in the context of transcatheter mitral valve replacement: establishing consensus among modalities and disciplines. JACC Cardiovasc Imaging. 2015;8(10):1191-1208. doi:10.1016/j.jcmg.2015.08.004 — Not readable (publisher site behind a Cloudflare check; owner asked for a copy); the page's source for annular segmentation and sizing; Palmisano A, Francone M, Rajiah P, et al. CT and MRI in periprocedural transcatheter mitral valve replacement: expert recommendations by the European Society of Cardiovascular Radiology (ESCR) and the North American Society for Cardiovascular Imaging (NASCI). Eur Radiol. Published online 2026-11-06. doi:10.1007/s00330-026-12955-0 — Not readable (Springer JavaScript challenge; not yet in PMC); the newest society document on TMVR CT
- **Proposed fix:** Keep "saddle-shaped, simplified to a D shape for sizing" (CAR); the phase, and the claim that the annulus is smallest in end-systole, need Blanke 2015 or the ESCR/NASCI 2026 document before they stay.
- **Proposed home:** TMVR planning CT › Measurement

### B3-tmvr-ct-05 · Mitral Annulus Sizing table

- **Verdict:** source-not-readable
- **Kind:** protocol · **Topic:** TMVR planning CT
- **The page says:** "Annular perimeter | Trace the full hinge-point ring in systole using sagittal + coronal oblique planes"; "Anteroposterior (AP) diameter | Mid-point from anterior mitral valve leaflet (AMVL) to posterior mitral valve leaflet (PMVL) insertion"; "Mediolateral (ML) diameter | Intercommissural distance"; "Annular area | Planimetry in reformatted plane perpendicular to the annular ring"; "Annular height | Septo-aortic horn (SAo) to inferior ventricular (IVt) commissural plane"
- **Source:** Blanke P, Naoum C, Webb J, et al. Multimodality imaging in the context of transcatheter mitral valve replacement: establishing consensus among modalities and disciplines. JACC Cardiovasc Imaging. 2015;8(10):1191-1208. doi:10.1016/j.jcmg.2015.08.004 — Not readable (publisher site behind a Cloudflare check; owner asked for a copy); Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — PDF pp. 6–7 (pp. 507–508): sizing on the D-shaped simplification of the saddle (no measurement definitions); Agricola E, Ancona F, Bartel T, et al. Multimodality imaging for patient selection, procedural guidance, and follow-up of transcatheter interventions for structural heart disease: a consensus document of the EACVI Task Force on Interventional Cardiovascular Imaging: part 1: access routes, transcatheter aortic valve implantation, and transcatheter mitral valve interventions. Eur Heart J Cardiovasc Imaging. 2023;24(9):e209-e268. doi:10.1093/ehjci/jead096 — Annuloplasty, p. e242 (not TMVR): area, circumference, AP and intercommissural diameters are the annular parameters used to plan annuloplasty
- **Proposed fix:** Check each definition against Blanke 2015 once read; say whether "the full hinge-point ring" means the saddle or the D-shaped contour CAR describes, and spell out "SAo" and "IVt", which no readable source uses.
- **Proposed home:** TMVR planning CT › Measurement

### B3-tmvr-ct-06 · "Saddle shape" note

- **Verdict:** source-not-readable
- **Kind:** teaching · **Topic:** TMVR planning CT
- **The page says:** "The mitral annulus has two high points (anteroseptal and posterolateral) and two low points (intercommissural). Perimeter- and area-derived sizing are preferred; 2D diameters alone underestimate true dimensions."
- **Source:** Blanke P, Naoum C, Webb J, et al. Multimodality imaging in the context of transcatheter mitral valve replacement: establishing consensus among modalities and disciplines. JACC Cardiovasc Imaging. 2015;8(10):1191-1208. doi:10.1016/j.jcmg.2015.08.004 — Not readable (publisher site behind a Cloudflare check; owner asked for a copy); Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — PDF pp. 6–7 (pp. 507–508): "complex saddle shape"; no description of its high and low points
- **Proposed fix:** Check the anatomy and the sizing preference against Blanke 2015 once read; until then the note can say only that the saddle is simplified to a D shape for sizing (CAR).
- **Proposed home:** TMVR planning CT › Background

### B3-tmvr-ct-07 · Neo-LVOT warning box

- **Verdict:** source-not-readable
- **Kind:** guideline-threshold · **Topic:** TMVR planning CT
- **The page says:** "Critical Threshold: ≤1.7 cm² = High Risk"; "Neo-LVOT area is the single most important CT-derived parameter for TMVR feasibility. A predicted neo-LVOT area ≤1.7 cm² (170 mm²) carries high risk for dynamic LVOT obstruction and hemodynamic compromise."
- **Source:** Reid A, Ben Zekry S, Turaga M, et al. Neo-LVOT and transcatheter mitral valve replacement: expert recommendations. JACC Cardiovasc Imaging. 2021;14(4):854-866. doi:10.1016/j.jcmg.2020.09.027 — Not readable (publisher site behind a Cloudflare check; owner asked for a copy); CAR cites it for the neo-LVOT (reference 48, PDF p. 15, p. 516); Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — PDF p. 7 (p. 508): neo-LVOT size "is essential in prediction of ... obstruction risk"; no number; Agricola E, Ancona F, Bartel T, et al. Multimodality imaging for patient selection, procedural guidance, and follow-up of transcatheter interventions for structural heart disease: a consensus document of the EACVI Task Force on Interventional Cardiovascular Imaging: part 1: access routes, transcatheter aortic valve implantation, and transcatheter mitral valve interventions. Eur Heart J Cardiovasc Imaging. 2023;24(9):e209-e268. doi:10.1093/ehjci/jead096 — p. e262: neo-LVOT prediction listed in pre-procedural planning; no number
- **Proposed fix:** Label 1.7 cm² as Reid 2021's figure, unverified, until the owner's copy is read; "single most important parameter" is stronger than CAR's "key component" and should follow the source's own wording.
- **Proposed home:** TMVR planning CT › Categories

### B3-tmvr-ct-08 · Neo-LVOT simulation method (steps 1–4)

- **Verdict:** source-not-readable
- **Kind:** protocol · **Topic:** TMVR planning CT
- **The page says:** "1. Place a virtual device (cylinder matching prosthesis dimensions) at the annular plane on CT 2. Reformat at end-systole — the phase when the AMVL reaches maximal systolic anterior motion 3. Measure the residual triangular orifice bounded by: virtual device body, AMVL, and interventricular septum (IVS) 4. Report minimum neo-LVOT area"
- **Source:** Reid A, Ben Zekry S, Turaga M, et al. Neo-LVOT and transcatheter mitral valve replacement: expert recommendations. JACC Cardiovasc Imaging. 2021;14(4):854-866. doi:10.1016/j.jcmg.2020.09.027 — Not readable (publisher site behind a Cloudflare check; owner asked for a copy); the page's source for the method; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — Figure 6 caption, PDF p. 7 (p. 508): "model placement of a TMVR with the neo-LVOT depicted by the crescentic blue outline"; Agricola E, Ancona F, Bartel T, et al. Multimodality imaging for patient selection, procedural guidance, and follow-up of transcatheter interventions for structural heart disease: a consensus document of the EACVI Task Force on Interventional Cardiovascular Imaging: part 1: access routes, transcatheter aortic valve implantation, and transcatheter mitral valve interventions. Eur Heart J Cardiovasc Imaging. 2023;24(9):e209-e268. doi:10.1093/ehjci/jead096 — p. e262: the prosthesis is implanted in the fully open native valve, so "the native anterior leaflet becomes the posterior boundary of the new LVOT"; Figure 53, p. e263 (software prediction)
- **Proposed fix:** Check the phase and steps against Reid 2021 once read; meanwhile "triangular" conflicts with CAR's Figure 6 ("crescentic"), and in TMVR the device holds the anterior leaflet open (EACVI), so "maximal systolic anterior motion" needs the source's wording.
- **Proposed home:** TMVR planning CT › Measurement

### B3-tmvr-ct-09 · Neo-LVOT area risk table

- **Verdict:** source-not-readable
- **Kind:** guideline-threshold · **Topic:** TMVR planning CT
- **The page says:** ">2.0 cm² | Lower risk | Proceed with standard planning"; "1.7–2.0 cm² | Intermediate | Careful assessment; consider multiphase analysis"; "≤1.7 cm² | High risk | Consider LAMPOON, alcohol septal ablation, or alternate therapy"
- **Source:** Reid A, Ben Zekry S, Turaga M, et al. Neo-LVOT and transcatheter mitral valve replacement: expert recommendations. JACC Cardiovasc Imaging. 2021;14(4):854-866. doi:10.1016/j.jcmg.2020.09.027 — Not readable (publisher site behind a Cloudflare check; owner asked for a copy); Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — PDF p. 7 (p. 508): no neo-LVOT bands or mitigation; Agricola E, Ancona F, Bartel T, et al. Multimodality imaging for patient selection, procedural guidance, and follow-up of transcatheter interventions for structural heart disease: a consensus document of the EACVI Task Force on Interventional Cardiovascular Imaging: part 1: access routes, transcatheter aortic valve implantation, and transcatheter mitral valve interventions. Eur Heart J Cardiovasc Imaging. 2023;24(9):e209-e268. doi:10.1093/ehjci/jead096 — pp. e262–e264: no neo-LVOT bands or mitigation
- **Proposed fix:** Keep it labelled unverified until Reid 2021 is read; the 1.7–2.0 cm² band and the mitigation list both need it.
- **Proposed home:** TMVR planning CT › Management

### B3-tmvr-ct-10 · "Risk varies by scenario" table

- **Verdict:** source-not-readable
- **Kind:** teaching · **Topic:** TMVR planning CT
- **The page says:** "Native TMVR | Variable; depends on AMVL length and IVS thickness"; "Valve-in-valve (prior surgical bioprosthesis) | Generally lower — stented frame constrains leaflets"; "Valve-in-ring (prior annuloplasty ring) | Higher — ring constrains annular dilatation, AMVL may be long"; "Valve-in-MAC (mitral annular calcification) | Often highest — calcium bulk displaces device anteriorly"
- **Source:** Reid A, Ben Zekry S, Turaga M, et al. Neo-LVOT and transcatheter mitral valve replacement: expert recommendations. JACC Cardiovasc Imaging. 2021;14(4):854-866. doi:10.1016/j.jcmg.2020.09.027 — Not readable (publisher site behind a Cloudflare check; owner asked for a copy); the page's source for risk by scenario; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — PDF pp. 6–7 (pp. 507–508): no scenarios
- **Proposed fix:** Check against Reid 2021 once read.
- **Proposed home:** TMVR planning CT › Background

### B3-tmvr-ct-11 · Adjacent Structures table: circumflex artery row

- **Verdict:** correct
- **Kind:** teaching · **Topic:** TMVR planning CT
- **The page says:** "Circumflex artery | Distance from annular plane; risk of compression by device"
- **Source:** Agricola E, Ancona F, Bartel T, et al. Multimodality imaging for patient selection, procedural guidance, and follow-up of transcatheter interventions for structural heart disease: a consensus document of the EACVI Task Force on Interventional Cardiovascular Imaging: part 1: access routes, transcatheter aortic valve implantation, and transcatheter mitral valve interventions. Eur Heart J Cardiovasc Imaging. 2023;24(9):e209-e268. doi:10.1093/ehjci/jead096 — TMVR, Complications, p. e264: "New wall motion abnormalities due to compression on the left circumflex coronary artery"; annuloplasty, pp. e244 and e246: proximity of the circumflex to the annulus is assessed on CT
- **Proposed home:** TMVR planning CT › Measurement

### B3-tmvr-ct-12 · Adjacent Structures table: aortic valve, left atrial appendage and pulmonary vein rows

- **Verdict:** source-not-readable
- **Kind:** teaching · **Topic:** TMVR planning CT
- **The page says:** "Aortic valve | Aortomitral continuity angle; anterior displacement risk"; "Left atrial appendage | Relationship to device; LAA closure feasibility"; "Pulmonary veins | Proximity to device landing zone"
- **Source:** Blanke P, Naoum C, Webb J, et al. Multimodality imaging in the context of transcatheter mitral valve replacement: establishing consensus among modalities and disciplines. JACC Cardiovasc Imaging. 2015;8(10):1191-1208. doi:10.1016/j.jcmg.2015.08.004 — Not readable (publisher site behind a Cloudflare check; owner asked for a copy); Agricola E, Ancona F, Bartel T, et al. Multimodality imaging for patient selection, procedural guidance, and follow-up of transcatheter interventions for structural heart disease: a consensus document of the EACVI Task Force on Interventional Cardiovascular Imaging: part 1: access routes, transcatheter aortic valve implantation, and transcatheter mitral valve interventions. Eur Heart J Cardiovasc Imaging. 2023;24(9):e209-e268. doi:10.1093/ehjci/jead096 — pp. e262–e264: none of the three listed for TMVR
- **Proposed fix:** Check against Blanke 2015 once read; if it does not list them, mark the rows local practice or drop them.
- **Proposed home:** TMVR planning CT › Measurement

### B3-tmvr-ct-13 · Transseptal Planning table: fossa ovalis thickness

- **Verdict:** source-not-readable
- **Kind:** guideline-threshold · **Topic:** TMVR planning CT
- **The page says:** "Fossa ovalis thickness | <4 mm for unobstructed transseptal puncture"
- **Source:** Blanke P, Naoum C, Webb J, et al. Multimodality imaging in the context of transcatheter mitral valve replacement: establishing consensus among modalities and disciplines. JACC Cardiovasc Imaging. 2015;8(10):1191-1208. doi:10.1016/j.jcmg.2015.08.004 — Not readable (publisher site behind a Cloudflare check; owner asked for a copy); Pulerwitz TC, Khalique OK, Leb J, et al. Optimizing cardiac CT protocols for comprehensive acquisition prior to percutaneous MV and TV repair/replacement. JACC Cardiovasc Imaging. 2020;13(3):836-850. doi:10.1016/j.jcmg.2019.01.041 — Not readable (publisher site behind a Cloudflare check; owner asked for a copy); Agricola E, Ancona F, Bartel T, et al. Multimodality imaging for patient selection, procedural guidance, and follow-up of transcatheter interventions for structural heart disease: a consensus document of the EACVI Task Force on Interventional Cardiovascular Imaging: part 1: access routes, transcatheter aortic valve implantation, and transcatheter mitral valve interventions. Eur Heart J Cardiovasc Imaging. 2023;24(9):e209-e268. doi:10.1093/ehjci/jead096 — Transseptal puncture, pp. e210–e213 and Tables 1–2: fossa anatomy, site and steps; no thickness threshold
- **Proposed fix:** No readable document gives a fossa thickness; check Blanke 2015 and Pulerwitz 2020 once read, and if neither states <4 mm, drop it or mark it local practice.
- **Proposed home:** TMVR planning CT › Measurement

### B3-tmvr-ct-14 · Transseptal Planning table: puncture height above the annulus

- **Verdict:** source-not-readable
- **Kind:** guideline-threshold · **Topic:** TMVR planning CT
- **The page says:** "Transseptal height above annular plane | 3.5–4.5 cm (device delivery trajectory)"
- **Source:** Blanke P, Naoum C, Webb J, et al. Multimodality imaging in the context of transcatheter mitral valve replacement: establishing consensus among modalities and disciplines. JACC Cardiovasc Imaging. 2015;8(10):1191-1208. doi:10.1016/j.jcmg.2015.08.004 — Not readable (publisher site behind a Cloudflare check; owner asked for a copy); Agricola E, Ancona F, Bartel T, et al. Multimodality imaging for patient selection, procedural guidance, and follow-up of transcatheter interventions for structural heart disease: a consensus document of the EACVI Task Force on Interventional Cardiovascular Imaging: part 1: access routes, transcatheter aortic valve implantation, and transcatheter mitral valve interventions. Eur Heart J Cardiovasc Imaging. 2023;24(9):e209-e268. doi:10.1093/ehjci/jead096 — Heights are given per device, none for TMVR: MitraClip ≥4.0 cm (4–5 cm in prolapse, 3.5–4.0 cm acceptable in secondary MR), p. e251; Cardioband no <3.5 cm, p. e245; Pascal ≥4.5 cm, p. e262
- **Proposed fix:** Say the height is device-specific (EACVI gives it per device, none for TMVR) and keep 3.5–4.5 cm only if Blanke 2015 or the device's instructions state it.
- **Proposed home:** TMVR planning CT › Measurement

### B3-tmvr-ct-15 · Transseptal Planning table: septum-to-annulus angle and left atrial size rows

- **Verdict:** source-not-readable
- **Kind:** teaching · **Topic:** TMVR planning CT
- **The page says:** "Interatrial septum-to-annulus angle | Determines catheter trajectory and device alignment"; "Left atrial dimensions | Adequate chamber size for device delivery system"
- **Source:** Blanke P, Naoum C, Webb J, et al. Multimodality imaging in the context of transcatheter mitral valve replacement: establishing consensus among modalities and disciplines. JACC Cardiovasc Imaging. 2015;8(10):1191-1208. doi:10.1016/j.jcmg.2015.08.004 — Not readable (publisher site behind a Cloudflare check; owner asked for a copy); Agricola E, Ancona F, Bartel T, et al. Multimodality imaging for patient selection, procedural guidance, and follow-up of transcatheter interventions for structural heart disease: a consensus document of the EACVI Task Force on Interventional Cardiovascular Imaging: part 1: access routes, transcatheter aortic valve implantation, and transcatheter mitral valve interventions. Eur Heart J Cardiovasc Imaging. 2023;24(9):e209-e268. doi:10.1093/ehjci/jead096 — Transseptal puncture, pp. e210–e213: site-specific puncture by procedure (Table 1), no TMVR row
- **Proposed fix:** Check against Blanke 2015 once read.
- **Proposed home:** TMVR planning CT › Measurement

### B3-tmvr-ct-16 · Fluoroscopic Projection Planning

- **Verdict:** source-not-readable
- **Kind:** teaching · **Topic:** TMVR planning CT
- **The page says:** "CT-derived coplanar angle prediction: the plane perpendicular to the mitral annular plane defines the optimal fluoroscopic working view. Report LAO/RAO and cranial/caudal angulations."
- **Source:** Blanke P, Naoum C, Webb J, et al. Multimodality imaging in the context of transcatheter mitral valve replacement: establishing consensus among modalities and disciplines. JACC Cardiovasc Imaging. 2015;8(10):1191-1208. doi:10.1016/j.jcmg.2015.08.004 — Not readable (publisher site behind a Cloudflare check; owner asked for a copy); the page credits it with fluoroscopic angle prediction; Agricola E, Ancona F, Bartel T, et al. Multimodality imaging for patient selection, procedural guidance, and follow-up of transcatheter interventions for structural heart disease: a consensus document of the EACVI Task Force on Interventional Cardiovascular Imaging: part 1: access routes, transcatheter aortic valve implantation, and transcatheter mitral valve interventions. Eur Heart J Cardiovasc Imaging. 2023;24(9):e209-e268. doi:10.1093/ehjci/jead096 — Transapical puncture, p. e211 (TMVR is approached transapically): "CT allows the optimal fluoroscopic working plane to be derived together with the angle of entry"; Cardioband, p. e244: CT gives "the expected fluoroscopic projections"
- **Proposed fix:** The idea is supported (EACVI), but the mitral coplanar definition needs Blanke 2015; add the caveat SCCT gives for TAVI, that predicted angles hold only if the patient lay supine on the CT.
- **Proposed home:** TMVR planning CT › Reporting

### B3-tmvr-ct-17 · References box (citations and roles)

- **Verdict:** source-not-readable
- **Kind:** provenance · **Topic:** TMVR planning CT
- **The page says:** Blanke P, et al. "Multimodality Imaging in the Context of Transcatheter Mitral Valve Replacement: Establishing Consensus Among Modalities and Disciplines." JACC: Cardiovascular Imaging. 2015;8(10):1191–1208, DOI 10.1016/j.jcmg.2015.08.004, "Foundational consensus"; Reid A, et al. "Neo-LVOT and Transcatheter Mitral Valve Replacement: Expert Recommendations." JACC: Cardiovascular Imaging. 2021;14(4):854–866, DOI 10.1016/j.jcmg.2020.09.027, "Step-by-step CT neo-LVOT simulation methodology; ≤1.7 cm² threshold; risk stratification across clinical scenarios; mitigation strategies"; Pulerwitz TC, et al. "Optimizing Cardiac CT Protocols for Comprehensive Acquisition Prior to Percutaneous MV and TV Repair/Replacement." JACC: Cardiovascular Imaging. 2020;13(3):836–850, DOI 10.1016/j.jcmg.2019.01.041, "Most detailed published CT protocol guide". No CAR or EACVI document is cited.
- **Source:** Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — Reference 48, PDF p. 15 (p. 516): Reid A, ... JACC Cardiovasc Imaging. 2021;14(4):854-866, doi 10.1016/j.jcmg.2020.09.027 (matches); TMVR section pp. 507–508 (not cited by the page); Hausleiter J, Stolz L, Lurz P, et al. Transcatheter tricuspid valve replacement. J Am Coll Cardiol. 2025;85(3):265-291. doi:10.1016/j.jacc.2024.10.071 — Reference 47, p. 290: Pulerwitz TC, Khalique OK, Leb J, et al. ... 2020;13:836–850 (matches); Blanke P, Naoum C, Webb J, et al. Multimodality imaging in the context of transcatheter mitral valve replacement: establishing consensus among modalities and disciplines. JACC Cardiovasc Imaging. 2015;8(10):1191-1208. doi:10.1016/j.jcmg.2015.08.004 — Not readable (publisher site behind a Cloudflare check; owner asked for a copy); the citation matches the DOI's record in sources.json, but no readable reference list cites it; Reid A, Ben Zekry S, Turaga M, et al. Neo-LVOT and transcatheter mitral valve replacement: expert recommendations. JACC Cardiovasc Imaging. 2021;14(4):854-866. doi:10.1016/j.jcmg.2020.09.027 — Not readable (publisher site behind a Cloudflare check; owner asked for a copy); the roles the page gives it (1.7 cm², scenarios, mitigation) cannot be checked; Pulerwitz TC, Khalique OK, Leb J, et al. Optimizing cardiac CT protocols for comprehensive acquisition prior to percutaneous MV and TV repair/replacement. JACC Cardiovasc Imaging. 2020;13(3):836-850. doi:10.1016/j.jcmg.2019.01.041 — Not readable (publisher site behind a Cloudflare check; owner asked for a copy); Palmisano A, Francone M, Rajiah P, et al. CT and MRI in periprocedural transcatheter mitral valve replacement: expert recommendations by the European Society of Cardiovascular Radiology (ESCR) and the North American Society for Cardiovascular Imaging (NASCI). Eur Radiol. Published online 2026-11-06. doi:10.1007/s00330-026-12955-0 — Not readable; newer (online 2026-11-06) and not cited; Agricola E, Ancona F, Bartel T, et al. Multimodality imaging for patient selection, procedural guidance, and follow-up of transcatheter interventions for structural heart disease: a consensus document of the EACVI Task Force on Interventional Cardiovascular Imaging: part 1: access routes, transcatheter aortic valve implantation, and transcatheter mitral valve interventions. Eur Heart J Cardiovasc Imaging. 2023;24(9):e209-e268. doi:10.1093/ehjci/jead096 — TMVR, pp. e262–e264 (not cited by the page)
- **Proposed fix:** The three citations are accurate; add CAR/CSTR 2024 Part 2 (pp. 507–508) and EACVI 2023 (pp. e262–e264), and the ESCR/NASCI 2026 recommendations once they can be read.
- **Question for the owner:** Which document should lead TMVR CT once readable: the ESCR/NASCI 2026 recommendations (newest, radiology societies) or the page's Blanke 2015 and Reid 2021? CAR 2024 gives no numbers.
- **Proposed home:** TMVR planning CT › Applies to

### B3-tmvr-ct-18 · Front-page row (shared/data/resources.ts, id tmvr-ct)

- **Verdict:** correct
- **Kind:** listing · **Topic:** TMVR planning CT
- **The page says:** Title "TMVR planning CT", version "none", summary "Mitral annulus sizing and neo-LVOT assessment before transcatheter mitral valve replacement."
- **Source:** Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — PDF pp. 6–7 (pp. 507–508): D-shaped annulus sizing and the neo-LVOT are the key CT elements of TMVR planning
- **Proposed fix:** The page states no version, so "none" is honest; when it is rebuilt, the label should name the lead chosen in B3-tmvr-ct-17 (owner signs off). The summary fits.
- **Proposed home:** Front page row: TMVR planning CT

## TTVR planning CT

https://dfergs93.github.io/cardiac-imaging-resources/cardiac_ct/device_planning/ttvr/

### B3-ttvr-ct-01 · Introduction: why tricuspid planning differs

- **Verdict:** source-not-readable
- **Kind:** teaching · **Topic:** TTVR planning CT
- **The page says:** "CT planning for transcatheter tricuspid valve interventions is the **least standardized** of the three transcatheter valve domains. The tricuspid annulus is larger, more dynamic, more non-planar, and more anatomically variable than the mitral annulus, and **right-heart contrast opacification** presents unique protocol challenges."
- **Source:** Hausleiter J, Stolz L, Lurz P, et al. Transcatheter tricuspid valve replacement. J Am Coll Cardiol. 2025;85(3):265-291. doi:10.1016/j.jacc.2024.10.071 — p. 266, "TTVR systems": distinctions between the mitral and tricuspid valve for transcatheter treatment are proximity to the atrioventricular node, lower closing pressure, a "larger, noncalcified native TV annulus" and the angulation between the IVC and the annulus ("IVC offset"); p. 278: 3 leaflets in about 60% of patients, 2, 4 or more in 40%. Nothing on the annulus being more dynamic or non-planar than the mitral, or on standardisation; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — TTVR section, PDF p. 7 (p. 508): "The acquisition technique requires different contrast timing to allow evaluation of the right atrium and right ventricle"; Hell MM, Emrich T, Kreidel F, et al. Computed tomography imaging needs for novel transcatheter tricuspid valve repair and replacement therapies. Eur Heart J Cardiovasc Imaging. 2021;22(6):601-610. doi:10.1093/ehjci/jeaa308 — Not read: the page’s main reference; academic.oup.com answered 403 behind a Cloudflare bot check on 2026-11-27 and there is no open copy (owner asked for one)
- **Proposed fix:** Keep what the readable sources say (a larger annulus, variable leaflet anatomy, right-heart contrast timing); drop "least standardized" and the "more dynamic, more non-planar" comparison with the mitral annulus unless Hell 2021 (once read) or another readable source supports them.
- **Proposed home:** TTVR planning CT › Background

### B3-ttvr-ct-02 · Acquisition box: gating and reconstruction numbers

- **Verdict:** correct
- **Kind:** guideline-threshold · **Topic:** TTVR planning CT
- **The page says:** "ECG-triggered **multiphasic** dataset: reconstruct at **5–10% R-R intervals** with **≤1 mm slice thickness**."
- **Source:** Hausleiter J, Stolz L, Lurz P, et al. Transcatheter tricuspid valve replacement. J Am Coll Cardiol. 2025;85(3):265-291. doi:10.1016/j.jacc.2024.10.071 — p. 272, "Cardiac computed tomography": "Dedicated protocols are required typically using ECG-triggered or 1-beat acquisitions of multiphasic data sets covering the entire cardiac cycle in 5% to 10% time intervals with a thin-sliced reconstruction ≤1 mm" (the sentence cites Pulerwitz 2020, ref 47, which is not readable); Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 1 Coronary CT Angiography (CCTA). Can Assoc Radiol J. 2024;75(3):488-501. doi:10.1177/08465371241233240 — Table 1, PDF p. 3 (p. 490), row "Transcatheter Tricuspid Valve Replacement (TTVR)": marked for retrospective ECG-gating only; comment "Consider no tube current modulation for better quality imaging."; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — TTVR section, PDF p. 7 (p. 508): "ECG gating is still essential."
- **Proposed fix:** Optional: say the whole cardiac cycle is covered (retrospective gating, as CAR Part 1 Table 1 marks TTVR, or a triggered or one-beat acquisition across the full cycle, Hausleiter p. 272) and add CAR's "consider no tube current modulation".
- **Proposed home:** TTVR planning CT › Technique

### B3-ttvr-ct-03 · Acquisition box: right-heart contrast

- **Verdict:** correct
- **Kind:** protocol · **Topic:** TTVR planning CT
- **The page says:** "Right-heart–optimized contrast protocol required — standard left-heart protocols produce inadequate opacification of the right atrium, annulus, and subvalvular apparatus. Consider split-bolus or modified injection timing to simultaneously opacify right and left heart chambers."
- **Source:** Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — TTVR section, PDF p. 7 (p. 508): "different contrast timing to allow evaluation of the right atrium and right ventricle"; Hausleiter J, Stolz L, Lurz P, et al. Transcatheter tricuspid valve replacement. J Am Coll Cardiol. 2025;85(3):265-291. doi:10.1016/j.jacc.2024.10.071 — p. 272: "optimized contrast enhancement of the right cardiac chambers (plus jugular veins in case of jugular access). For femoral access devices, a delayed phase acquisition of the abdomen and pelvis for evaluation of the inferior caval, iliac, and femoral veins may improve the prediction of device approach angles and height."; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 1 Coronary CT Angiography (CCTA). Can Assoc Radiol J. 2024;75(3):488-501. doi:10.1177/08465371241233240 — Table 1, PDF p. 3 (p. 490), row "Ventricular function": "Biventricular contrast protocol required (triphasic injection)"; split-bolus is not named for TTVR
- **Proposed fix:** Add the coverage Hausleiter gives (p. 272): the jugular veins when jugular access is planned, and a delayed abdomen–pelvis phase for the IVC, iliac and femoral veins before transfemoral devices. "Split-bolus" is not named by CAR or Hausleiter (the protocol paper they cite, Pulerwitz 2020, is not readable).
- **Proposed home:** TTVR planning CT › Technique

### B3-ttvr-ct-04 · Tricuspid annulus sizing: phase and primary metric

- **Verdict:** source-not-readable · **management**
- **Kind:** guideline-threshold · **Topic:** TTVR planning CT
- **The page says:** "The tricuspid annulus is **non-planar and highly dynamic** — dimensions vary substantially across the cardiac cycle. Measure in **end-systole** for sizing." Table row: "**Annular perimeter** | Primary sizing metric; trace full hinge-point ring in systole".
- **Source:** Hausleiter J, Stolz L, Lurz P, et al. Transcatheter tricuspid valve replacement. J Am Coll Cardiol. 2025;85(3):265-291. doi:10.1016/j.jacc.2024.10.071 — p. 277, Figure 6 (CT work-up before TTVR): the annulus (anteroposterior and septo-lateral diameters, minimum and maximum diameters, area), RV depth, RA height and the RV septo-lateral dimension are measured in both diastole (90% R-R) and systole (40%); in the example the diastolic values are larger (septo-lateral 48.0 vs 42.9 mm; maximum distance 52.1 vs 48.9 mm). No text names a sizing phase or a primary sizing metric. p. 270: imaging when volume-overloaded "may lead to ... excessive valve oversizing", volume depletion to undersizing; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — TTVR section, PDF p. 7 (p. 508): "For TTVR, CT can be used akin to TAVR and TMVR in determination of appropriate valve size" (no phase or metric); Hell MM, Emrich T, Kreidel F, et al. Computed tomography imaging needs for novel transcatheter tricuspid valve repair and replacement therapies. Eur Heart J Cardiovasc Imaging. 2021;22(6):601-610. doi:10.1093/ehjci/jeaa308 — Not read: the page’s main reference; academic.oup.com answered 403 behind a Cloudflare bot check on 2026-11-27 and there is no open copy (owner asked for one)
- **Proposed fix:** Until a source is read, say the annulus is measured in systole and diastole (as in Hausleiter's Figure 6) and that the sizing phase and metric are device-specific; do not state end-systolic perimeter as the rule.
- **Question for the owner:** Do the implanters you report for ask for a particular phase or metric (for example end-systolic perimeter)? If so the page can state it as local practice; otherwise it should give both phases until Hell 2021 is read.
- **Proposed home:** TTVR planning CT › Measurement

### B3-ttvr-ct-05 · Tricuspid annulus sizing: typical anteroposterior diameter

- **Verdict:** source-not-readable
- **Kind:** normal-values · **Topic:** TTVR planning CT
- **The page says:** "**Anteroposterior (AP) diameter** | Typically 40–55 mm; largest anterior-posterior dimension".
- **Source:** Hausleiter J, Stolz L, Lurz P, et al. Transcatheter tricuspid valve replacement. J Am Coll Cardiol. 2025;85(3):265-291. doi:10.1016/j.jacc.2024.10.071 — p. 277, Figure 6: one patient's systolic anteroposterior diameter, 43.5 mm (an example, not a range); p. 267, Table 1: TTVR valve sizes from 40 to 70 mm (device sizes, not annulus dimensions); Hell MM, Emrich T, Kreidel F, et al. Computed tomography imaging needs for novel transcatheter tricuspid valve repair and replacement therapies. Eur Heart J Cardiovasc Imaging. 2021;22(6):601-610. doi:10.1093/ehjci/jeaa308 — Not read: the page’s main reference; academic.oup.com answered 403 behind a Cloudflare bot check on 2026-11-27 and there is no open copy (owner asked for one)
- **Proposed fix:** Remove the 40–55 mm range, or cite the study it comes from once read; no readable source gives a typical annulus diameter in TTVR candidates.
- **Proposed home:** TTVR planning CT › Measurement

### B3-ttvr-ct-06 · Tricuspid annulus sizing: mediolateral diameter, area and height rows

- **Verdict:** source-not-readable
- **Kind:** protocol · **Topic:** TTVR planning CT
- **The page says:** "**Mediolateral (ML) diameter** | Intercommissural (septal-to-lateral) distance"; "**Annular area** | Planimetry in best-fit plane perpendicular to annular ring"; "**Annular height / non-planarity** | Saddle shape — measure deviation from flat plane".
- **Source:** Hausleiter J, Stolz L, Lurz P, et al. Transcatheter tricuspid valve replacement. J Am Coll Cardiol. 2025;85(3):265-291. doi:10.1016/j.jacc.2024.10.071 — p. 277, Figure 6 and legend: measures the "septo-lateral diameter" and the annulus area, with the commissures (septo-anterior, septo-posterior, anteroposterior) marked as landmarks; no annular height or non-planarity measurement; Hell MM, Emrich T, Kreidel F, et al. Computed tomography imaging needs for novel transcatheter tricuspid valve repair and replacement therapies. Eur Heart J Cardiovasc Imaging. 2021;22(6):601-610. doi:10.1093/ehjci/jeaa308 — Not read: the page’s main reference; academic.oup.com answered 403 behind a Cloudflare bot check on 2026-11-27 and there is no open copy (owner asked for one)
- **Proposed fix:** Use Hausleiter's terms (septo-lateral diameter; the commissures are landmarks, so "intercommissural" does not describe the septal-to-lateral line) and keep the area; source the annular height row before keeping it.
- **Proposed home:** TTVR planning CT › Measurement

### B3-ttvr-ct-07 · Tricuspid annulus sizing: coaptation gap row

- **Verdict:** correct
- **Kind:** teaching · **Topic:** TTVR planning CT
- **The page says:** "**Coaptation gap** | Distance between leaflet free edges in systole; relevant for edge-to-edge repair sizing".
- **Source:** Hausleiter J, Stolz L, Lurz P, et al. Transcatheter tricuspid valve replacement. J Am Coll Cardiol. 2025;85(3):265-291. doi:10.1016/j.jacc.2024.10.071 — p. 280, Figure 9: septolateral coaptation gap ≤7 mm favourable for edge-to-edge repair (T-TEER), >7 to ≤8.5 mm feasible, >8.5 mm favours replacement; p. 280 text: large central gaps predict suboptimal TR reduction after T-TEER; p. 281 summary: "Large coaptation gap (eg, ≥8.5 mm)" favours TTVR
- **Proposed fix:** Optional: say the gap decides suitability for edge-to-edge repair versus replacement, with Hausleiter's cut-offs (Figure 9) once traced to the studies it cites.
- **Proposed home:** TTVR planning CT › Measurement

### B3-ttvr-ct-08 · Adjacent structures table

- **Verdict:** source-not-readable
- **Kind:** teaching · **Topic:** TTVR planning CT
- **The page says:** Rows: "**Right coronary artery (RCA)** | Distance from annular plane — … compression risk with annuloplasty devices and replacement prostheses"; "**Papillary muscles** | Position and number … relevant for device anchoring and chordal preservation"; "**Right atrium** | Dimensions and morphology; large RA common in severe TR"; "**Right ventricle** | RV volume (RVEDVi), wall thickness, systolic function; severely dilated RV may impair device anchoring"; "**Coronary sinus** | Position relative to annulus; relevant for annuloplasty ring and some replacement systems"; "**Atrioventricular node** | Septal location — conduction risk with device implantation near the septum".
- **Source:** Hausleiter J, Stolz L, Lurz P, et al. Transcatheter tricuspid valve replacement. J Am Coll Cardiol. 2025;85(3):265-291. doi:10.1016/j.jacc.2024.10.071 — p. 266: proximity to the atrioventricular node and conduction system; p. 272: CT images the RCA, subvalvular apparatus, papillary muscle position, caval veins and CIED leads, and right-heart function and dimensions; p. 273 summary: CT measures "the TV apparatus, RV anatomy and function, as well as the venous access route and CIED lead position"; p. 280: the distance of the papillary muscles or moderator band from the annulus matters (cut-offs are device-specific), and a small RA height and RV length can prohibit implantation; p. 282: about one-third of TTVI patients have CIED leads (jailing, lead-related TR); new conduction disturbances 2–25%. Nothing on RCA compression, the coronary sinus or a dilated RV impairing anchoring; Hell MM, Emrich T, Kreidel F, et al. Computed tomography imaging needs for novel transcatheter tricuspid valve repair and replacement therapies. Eur Heart J Cardiovasc Imaging. 2021;22(6):601-610. doi:10.1093/ehjci/jeaa308 — Not read: the page’s main reference; academic.oup.com answered 403 behind a Cloudflare bot check on 2026-11-27 and there is no open copy (owner asked for one)
- **Proposed fix:** Add CIED leads (position and leaflet interaction; Hausleiter pp. 272–273, 282) and the moderator band, RA height and RV length (p. 280); the RCA "compression risk", the coronary sinus row and "severely dilated RV may impair device anchoring" need a readable source.
- **Proposed home:** TTVR planning CT › Measurement

### B3-ttvr-ct-09 · Vascular access table and access note

- **Verdict:** source-not-readable
- **Kind:** protocol · **Topic:** TTVR planning CT
- **The page says:** Rows: "**Transfemoral (venous)** | IVC diameter; IVC-to-annulus distance; IVC angulation | Most common …"; "**Transjugular** | Jugular-to-annulus distance; SVC-to-RA-to-annulus angle | Used for some annuloplasty and replacement systems"; "**Subclavian / axillary (venous)** | Vessel diameter; angulation to RA | Alternative venous access"; "**Transatrial / direct RA** | Surgical hybrid approach | Less common". Note: "Measure IVC diameter at multiple levels; assess for IVC filter (may preclude femoral access); evaluate hepatic vein anatomy (relevant for caval valve implantation)."
- **Source:** Hausleiter J, Stolz L, Lurz P, et al. Transcatheter tricuspid valve replacement. J Am Coll Cardiol. 2025;85(3):265-291. doi:10.1016/j.jacc.2024.10.071 — p. 266: TTVR is delivered by transfemoral or transjugular venous access; the transjugular route has less offset between the superior caval vein and the annulus; the angulation between the IVC and the annulus is the "IVC offset"; p. 267, Table 1: access per device (five transfemoral, three transjugular, Lux-Valve Plus also transatrial); p. 272: a delayed abdomen–pelvis phase for the inferior caval, iliac and femoral veins "may improve the prediction of device approach angles and height"; p. 280: the left femoral vein may increase the approach height. No subclavian or axillary route, IVC filter or hepatic vein line; Hell MM, Emrich T, Kreidel F, et al. Computed tomography imaging needs for novel transcatheter tricuspid valve repair and replacement therapies. Eur Heart J Cardiovasc Imaging. 2021;22(6):601-610. doi:10.1093/ehjci/jeaa308 — Not read: the page’s main reference; academic.oup.com answered 403 behind a Cloudflare bot check on 2026-11-27 and there is no open copy (owner asked for one)
- **Proposed fix:** Keep transfemoral and transjugular (and transatrial for some devices) and add IVC offset and approach height with the delayed venous phase (Hausleiter pp. 266, 272, 280); the subclavian/axillary route, the IVC filter line and the hepatic veins for caval valves need a readable source.
- **Proposed home:** TTVR planning CT › Measurement

### B3-ttvr-ct-10 · Vascular access: sheath sizes

- **Verdict:** source-not-readable
- **Kind:** guideline-threshold · **Topic:** TTVR planning CT
- **The page says:** "**Transfemoral (venous)** | … | Most common; large-bore venous sheaths (24–36 Fr)".
- **Source:** Hausleiter J, Stolz L, Lurz P, et al. Transcatheter tricuspid valve replacement. J Am Coll Cardiol. 2025;85(3):265-291. doi:10.1016/j.jacc.2024.10.071 — p. 267, Table 1: delivery systems of the eight TTVR devices are 28-F to 35-F (Evoque 28, Intrepid 35, Lux-Valve Plus 33, Trisol 30, Topaz 29, Cardiovalve 32, VDyne 28, MonarQ 29); the transfemoral ones are also 28–35 F; Hell MM, Emrich T, Kreidel F, et al. Computed tomography imaging needs for novel transcatheter tricuspid valve repair and replacement therapies. Eur Heart J Cardiovasc Imaging. 2021;22(6):601-610. doi:10.1093/ehjci/jeaa308 — Not read: the page’s main reference; academic.oup.com answered 403 behind a Cloudflare bot check on 2026-11-27 and there is no open copy (owner asked for one)
- **Proposed fix:** For replacement devices give Hausleiter's range (28–35 F delivery systems, Table 1); the 24 F and 36 F ends need a readable source.
- **Proposed home:** TTVR planning CT › Measurement

### B3-ttvr-ct-11 · Device class–specific parameters table

- **Verdict:** source-not-readable
- **Kind:** teaching · **Topic:** TTVR planning CT
- **The page says:** Rows: "**Edge-to-edge repair** (e.g., TRILUMINATE, CLASP) | Coaptation gap, leaflet length, annular dimensions, RV geometry"; "**Annuloplasty devices** | Annular perimeter, RCA proximity, coronary sinus position"; "**Orthotopic replacement** | Full annular sizing (perimeter, area, diameters), subvalvular anatomy, RV size, access route"; "**Caval valve implantation** (e.g., TRICENTO, CAVI) | IVC and SVC diameters at multiple levels; hepatic vein anatomy".
- **Source:** Hausleiter J, Stolz L, Lurz P, et al. Transcatheter tricuspid valve replacement. J Am Coll Cardiol. 2025;85(3):265-291. doi:10.1016/j.jacc.2024.10.071 — p. 272 and p. 280: for orthotopic replacement CT assesses the leaflets and annulus, subvalvular apparatus and papillary muscles, RV, caval veins and access; p. 288, Table 4: TriClip and PASCAL are the edge-to-edge devices (CLASP II TR is the PASCAL pivotal trial) and TricValve the caval valve implantation (CAVI) device; Hell MM, Emrich T, Kreidel F, et al. Computed tomography imaging needs for novel transcatheter tricuspid valve repair and replacement therapies. Eur Heart J Cardiovasc Imaging. 2021;22(6):601-610. doi:10.1093/ehjci/jeaa308 — Not read: the page’s main reference; academic.oup.com answered 403 behind a Cloudflare bot check on 2026-11-27 and there is no open copy (owner asked for one)
- **Proposed fix:** Name devices rather than trials or procedures (TriClip and PASCAL for edge-to-edge repair, TRILUMINATE and CLASP being their trials; CAVI is the procedure, TricValve a device, Hausleiter Table 4); the replacement row is supported (Hausleiter pp. 272, 280), the repair, annuloplasty and caval rows need a readable source.
- **Proposed home:** TTVR planning CT › Measurement

### B3-ttvr-ct-12 · Fluoroscopic projection planning

- **Verdict:** source-not-readable
- **Kind:** teaching · **Topic:** TTVR planning CT
- **The page says:** "CT can predict the optimal coplanar fluoroscopic working angle perpendicular to the tricuspid annular plane. Report LAO/RAO and cranial/caudal angulations; the tricuspid annulus is typically viewed in a right anterior oblique projection."
- **Source:** Hausleiter J, Stolz L, Lurz P, et al. Transcatheter tricuspid valve replacement. J Am Coll Cardiol. 2025;85(3):265-291. doi:10.1016/j.jacc.2024.10.071 — p. 272: the only angle statement is that a delayed venous phase "may improve the prediction of device approach angles and height"; no fluoroscopic working angle is given; Hell MM, Emrich T, Kreidel F, et al. Computed tomography imaging needs for novel transcatheter tricuspid valve repair and replacement therapies. Eur Heart J Cardiovasc Imaging. 2021;22(6):601-610. doi:10.1093/ehjci/jeaa308 — Not read: the page’s main reference; academic.oup.com answered 403 behind a Cloudflare bot check on 2026-11-27 and there is no open copy (owner asked for one)
- **Proposed fix:** Keep it marked unverified until Hell 2021 is read, or drop "typically viewed in a right anterior oblique projection".
- **Proposed home:** TTVR planning CT › Reporting

### B3-ttvr-ct-13 · References: Hell et al. 2021 row

- **Verdict:** source-not-readable
- **Kind:** provenance · **Topic:** TTVR planning CT
- **The page says:** "**Hell MM, et al.** ‘Computed Tomography Imaging Needs for Novel Transcatheter Tricuspid Valve Repair and Replacement Therapies.’ *European Heart Journal – Cardiovascular Imaging.* 2021;22(6):601–610. DOI: 10.1093/ehjci/jeaa308 | **Most widely cited dedicated review** — CT acquisition protocols with right-heart optimization, annular measurements, RCA proximity, access route assessment, fluoroscopic projection; organized by device class".
- **Source:** Hell MM, Emrich T, Kreidel F, et al. Computed tomography imaging needs for novel transcatheter tricuspid valve repair and replacement therapies. Eur Heart J Cardiovasc Imaging. 2021;22(6):601-610. doi:10.1093/ehjci/jeaa308 — Citation matches the publisher's record (Eur Heart J Cardiovasc Imaging 2021;22(6):601–610, doi 10.1093/ehjci/jeaa308, online 2020-11-28); the paper itself was not read (bot check), so the description and "most widely cited" cannot be checked
- **Proposed fix:** Keep the citation; check its description against a copy once the owner supplies one, and drop "most widely cited" (unverifiable).
- **Proposed home:** TTVR planning CT › Background

### B3-ttvr-ct-14 · References: Hausleiter et al. 2025 row

- **Verdict:** correct
- **Kind:** provenance · **Topic:** TTVR planning CT
- **The page says:** "**Hausleiter J, et al.** ‘Transcatheter Tricuspid Valve Replacement.’ *Journal of the American College of Cardiology.* 2025;85(3):265–291. DOI: 10.1016/j.jacc.2024.10.071 | **Most recent international expert consensus on orthotopic TTVR** (Jan 2025) — dedicated CT workup section; ECG-triggered multiphasic protocol; annulus sizing; jugular/IVC measurements; post-procedural CT".
- **Source:** Hausleiter J, Stolz L, Lurz P, et al. Transcatheter tricuspid valve replacement. J Am Coll Cardiol. 2025;85(3):265-291. doi:10.1016/j.jacc.2024.10.071 — p. 265: labelled "JACC State-of-the-Art Review", JACC 2025;85:265–291, January 28, 2025; abstract: "This consensus document provides a comprehensive overview of the current state of orthotopic TTVR"; p. 266: "The proposed recommendations are based on a consensus among expert authors representing centers with large TTVR experience" (no society endorsement); p. 272: CT paragraph (ECG-triggered or one-beat multiphasic protocol, jugular veins, delayed IVC/iliac/femoral phase, post-implant CT); p. 277, Figure 6 (CT work-up); p. 278, Figure 7 and p. 284, Figure 10 (post-TTVR CT). No annulus sizing method is given in the text; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — TTVR section, PDF p. 7 (p. 508): the lead document, not cited by the page; Davidson LJ, Tang GHL, Ho EC, et al. The tricuspid valve: a review of pathology, imaging, and current treatment options: a scientific statement from the American Heart Association. Circulation. 2024;149(22):e1223-e1238. doi:10.1161/CIR.0000000000001232 — Not read (ahajournals.org answered 403 behind a Cloudflare bot check on 2026-11-27): the one society statement on tricuspid imaging and treatment newer than Hell 2021
- **Proposed fix:** Optional: call it a JACC State-of-the-Art Review written as an expert consensus; "annulus sizing" and "jugular/IVC measurements" overstate it (Figure 6 and the veins to opacify, no sizing method). Add CAR/CSTR 2024 Part 2 (PDF p. 7, p. 508) as the lead reference.
- **Question for the owner:** Hausleiter 2025 is labelled a JACC State-of-the-Art Review but calls itself a consensus document of expert authors (no society endorses it). This audit treated its own statements (such as the CT protocol on p. 272) as expert consensus that can verify, and anything it reports from trials as traceable to those trials. Do you accept that, or should it count as a review (teaching only)?
- **Proposed home:** TTVR planning CT › Background

### B3-ttvr-ct-15 · References: "Gogia S, Khalique OK" row

- **Verdict:** wrong
- **Kind:** provenance · **Topic:** TTVR planning CT
- **The page says:** "**Gogia S, Khalique OK, et al.** ‘Computed Tomography Planning for Transcatheter Tricuspid Valve Interventions.’ *Seminars in Roentgenology.* 2024;59(1):44–56. DOI: 10.1053/j.ro.2023.11.002 | **Most specifically focused CT planning review** — device-specific anatomical parameters, RV geometry, vena cava assessment, RCA-annulus relationship, access route evaluation; imaging requirements per device class".
- **Source:** Crossref REST API, works 10.1053/j.ro.2023.11.001 (Yang IY, Pogatchnik BP. Computed tomography planning for transcatheter tricuspid valve interventions. Semin Roentgenol. 2024;59(1):87-102) and 10.1053/j.ro.2023.11.002 (Nabipoorashrafi SA, et al. A pictorial review of CT guidance for transcatheter aortic valve replacement. Semin Roentgenol. 2024;59(1):44-56), retrieved 2026-11-27. — doi 10.1053/j.ro.2023.11.002 is Nabipoorashrafi et al., "A Pictorial Review of CT Guidance for Transcatheter Aortic Valve Replacement", Semin Roentgenol 2024;59(1):44–56; doi 10.1053/j.ro.2023.11.001 is Yang and Pogatchnik, "Computed Tomography Planning for Transcatheter Tricuspid Valve Interventions", 2024;59(1):87–102; Yang IY, Pogatchnik BP. Computed tomography planning for transcatheter tricuspid valve interventions. Semin Roentgenol. 2024;59(1):87-102. doi:10.1053/j.ro.2023.11.001 — Not read (closed access). PubMed lists one Gogia–Khalique paper, on CT before transcatheter valves for aortic regurgitation (Struct Heart 2023), and no tricuspid CT review by them
- **Proposed fix:** Replace with "Yang IY, Pogatchnik BP. Computed tomography planning for transcatheter tricuspid valve interventions. Semin Roentgenol. 2024;59(1):87–102. doi:10.1053/j.ro.2023.11.001" and drop the description until the paper is read, or remove the row.
- **Question for the owner:** Keep the Yang and Pogatchnik paper (closed access; a copy would be needed to check the description) or drop the row?
- **Proposed home:** TTVR planning CT › Background

### B3-ttvr-ct-16 · Front-page row (shared/data/resources.ts, id ttvr-ct)

- **Verdict:** correct
- **Kind:** listing · **Topic:** TTVR planning CT
- **The page says:** Title "TTVR planning CT", version "none", summary "Tricuspid annulus sizing, adjacent structures and access before transcatheter tricuspid procedures."
- **Source:** Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — TTVR section, PDF p. 7 (p. 508): no versioned TTVR guideline; CT for valve size, right-heart contrast timing; Hausleiter J, Stolz L, Lurz P, et al. Transcatheter tricuspid valve replacement. J Am Coll Cardiol. 2025;85(3):265-291. doi:10.1016/j.jacc.2024.10.071 — p. 272: CT for anchoring (leaflets and annulus), adjacent structures and access
- **Proposed fix:** The page states no version, so "none" is right; the summary matches what the page covers.
- **Proposed home:** Front page row: TTVR planning CT

## LAAO planning CT

https://dfergs93.github.io/cardiac-imaging-resources/cardiac_ct/device_planning/laao/

### B3-laao-ct-01 · Page heading and sources (none cited)

- **Verdict:** unsourced
- **Kind:** provenance · **Topic:** LAAO planning CT
- **The page says:** Title "LAAO Planning CT"; "Pre-procedural CT for left atrial appendage occlusion (LAAO)." The page has no reference box, no references, no version and no review date: nothing on it says where its numbers come from.
- **Source:** Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — "Left Atrial Appendage (LAA) Closure and Other Plugs and Baskets", PDF p. 8 (p. 509): CT is comparable to TOE for excluding thrombus and better for complex LAA anatomy, measurement for device sizing and pulmonary venous and extracardiac structures; post-procedural CT for device position, embolization, occlusion and peri-device leak. No measurements or device numbers; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 1 Coronary CT Angiography (CCTA). Can Assoc Radiol J. 2024;75(3):488-501. doi:10.1177/08465371241233240 — Table 1, PDF p. 3 (p. 490), row "Left atrial appendage closure devices (planning and post insertion)": retrospective ECG-gating; "Delayed imaging may be required. Retrospective gating can demonstrate the dynamic morphologic changes in the left atrial appendage that can help with sizing of closure devices."; Saw J, Holmes DR, Cavalcante JL, et al. SCAI/HRS expert consensus statement on transcatheter left atrial appendage closure. J Soc Cardiovasc Angiogr Interv. 2023;2(3):100577. doi:10.1016/j.jscai.2022.100577 (also JACC Cardiovasc Interv. 2023;16(11):1384-1400 and Heart Rhythm 2023) — Section "Preprocedural imaging", recommendation 3 and Figure 2 (CT technique, landing zone, depth, delayed scan, CT vs TEE); "Technical aspects", recommendation 5, "Deployment of LAAC device": operators should follow each device's instructions for use. Endorsed by the ACC and SCCT; Goldsweig AM, Glikson M, Joza J, et al. 2025 SCAI/HRS clinical practice guidelines on transcatheter left atrial appendage occlusion. J Soc Cardiovasc Angiogr Interv. 2025;4(9):103783. doi:10.1016/j.jscai.2025.103783 (also Heart Rhythm 2025) — Recommendation 3.1: pre-procedural TEE or CT suggested (conditional, very low certainty); recommendation 6.1: post-procedural TEE or CT suggested; Sade LE, Faletra FF, Pontone G, et al. The role of multi-modality imaging for the assessment of left atrium and left atrial appendage: a clinical consensus statement of the European Association of Cardiovascular Imaging (EACVI), European Heart Rhythm Association (EHRA) of the European Society of Cardiology (ESC). Eur Heart J Cardiovasc Imaging. 2025;26(3):385-413. doi:10.1093/ehjci/jeaf014 — pp. 386 (morphology), 393–394 (CT and the delayed scan), 405–407 (LAA closure: sizing, peri-device leak, surveillance); US Food and Drug Administration. Summary of Safety and Effectiveness Data: WATCHMAN FLX Left Atrial Appendage (LAA) Closure Technology; WATCHMAN FLX and WATCHMAN FLX Pro LAA Closure Devices with Delivery System (Boston Scientific). PMA P130013/S074, approved July 16, 2025. — Table 1, p. 4: Watchman FLX and FLX Pro device sizing; Korsholm K, Berti S, Iriart X, et al. Expert recommendations on cardiac computed tomography for planning transcatheter left atrial appendage occlusion. JACC Cardiovasc Interv. 2020;13(3):277-292. doi:10.1016/j.jcin.2019.08.054 — Not read: the expert CT recommendations for LAAO planning (morphology, ostium and landing-zone measurement, sizing by device); jacc.org and sciencedirect.com answered 403 behind a Cloudflare bot check on 2026-11-27 (owner asked for a copy)
- **Proposed fix:** Name the sources section by section: CAR/CSTR 2024 Part 2 (p. 509) as the lead, the SCAI/HRS 2023 consensus and EACVI 2025 for measurement and thrombus imaging, and the Watchman FLX/FLX Pro instructions for use for device sizing.
- **Question for the owner:** CAR's LAA section gives no measurements or sizing. On the rebuilt page, should the SCAI/HRS 2023 expert consensus (endorsed by SCCT) carry the measurement and thrombus guidance, with EACVI 2025 noted where it differs, or should it wait for Korsholm 2020 (the CT expert recommendations; a copy has been requested)?
- **Proposed home:** LAAO planning CT › Applies to

### B3-laao-ct-02 · LAA anatomy: morphology definitions and stroke-risk notes

- **Verdict:** correct
- **Kind:** teaching · **Topic:** LAAO planning CT
- **The page says:** "Chicken wing | Sharp bend in proximal LAA | More protective against stroke?"; "Cactus | Multiple lobes off main trunk"; "Windsock | Single dominant lobe"; "Cauliflower | No dominant lobe, irregular | Highest stroke risk".
- **Source:** Sade LE, Faletra FF, Pontone G, et al. The role of multi-modality imaging for the assessment of left atrium and left atrial appendage: a clinical consensus statement of the European Association of Cardiovascular Imaging (EACVI), European Heart Rhythm Association (EHRA) of the European Society of Cardiology (ESC). Eur Heart J Cardiovasc Imaging. 2025;26(3):385-413. doi:10.1093/ehjci/jeaf014 — p. 386: four types "with possible overlaps": windsock (single central lobe), chicken wing (bended central lobe), cauliflower (short central lobe and several lobes, distal width larger than the proximal part), cactus (central lobe leading to several secondary lobes superiorly and inferiorly); p. 394: CT differentiates the four; Table 8, p. 399: "LAA non-chicken wing morphology" is a CT and TOE marker of cardioembolic risk; p. 404: "a large non-chicken wing (cauliflower in particular) morphology" is a risk factor for thrombus formation
- **Proposed fix:** Optional: use EACVI's definitions (the cauliflower type has a short central lobe rather than none) and say the types overlap.
- **Proposed home:** LAAO planning CT › Background

### B3-laao-ct-03 · LAA anatomy: frequency and closure notes

- **Verdict:** source-not-readable
- **Kind:** teaching · **Topic:** LAAO planning CT
- **The page says:** "Cactus | … | Complex — larger device may be needed"; "Windsock | … | Common"; "Cauliflower | … | … most challenging".
- **Source:** Sade LE, Faletra FF, Pontone G, et al. The role of multi-modality imaging for the assessment of left atrium and left atrial appendage: a clinical consensus statement of the European Association of Cardiovascular Imaging (EACVI), European Heart Rhythm Association (EHRA) of the European Society of Cardiology (ESC). Eur Heart J Cardiovasc Imaging. 2025;26(3):385-413. doi:10.1093/ehjci/jeaf014 — p. 386: gives the four types with no frequencies and no device implications; Saw J, Holmes DR, Cavalcante JL, et al. SCAI/HRS expert consensus statement on transcatheter left atrial appendage closure. J Soc Cardiovasc Angiogr Interv. 2023;2(3):100577. doi:10.1016/j.jscai.2022.100577 (also JACC Cardiovasc Interv. 2023;16(11):1384-1400 and Heart Rhythm 2023) — Figure 2 legend: measure to the main lobe, not accessory lobes; no morphology classes or device implications; Korsholm K, Berti S, Iriart X, et al. Expert recommendations on cardiac computed tomography for planning transcatheter left atrial appendage occlusion. JACC Cardiovasc Interv. 2020;13(3):277-292. doi:10.1016/j.jcin.2019.08.054 — Not read: the expert CT recommendations for LAAO planning (morphology, ostium and landing-zone measurement, sizing by device); jacc.org and sciencedirect.com answered 403 behind a Cloudflare bot check on 2026-11-27 (owner asked for a copy)
- **Proposed fix:** Drop the three notes or source them once Korsholm 2020 is read.
- **Proposed home:** LAAO planning CT › Background

### B3-laao-ct-04 · Key measurements: ostium maximum diameter

- **Verdict:** correct
- **Kind:** protocol · **Topic:** LAAO planning CT
- **The page says:** "LAA ostium max D | Widest diameter at ostium".
- **Source:** Boston Scientific. WATCHMAN Left Atrial Appendage Closure Device with Delivery System, and WATCHMAN FLX Left Atrial Appendage Closure Device with Delivery System: directions for use. Labeling approved by the US FDA with PMA P130013/S035, July 21, 2020. — Watchman FLX instructions, p. 56, "Pre-Procedural Instructions": measure LAA ostium width and depth through multiple views and "Determine the greatest width"; on TEE the ostium runs from the coronary artery (circumflex) marker or the mitral annulus to a point about 2 cm from the tip of the limbus; Saw J, Holmes DR, Cavalcante JL, et al. SCAI/HRS expert consensus statement on transcatheter left atrial appendage closure. J Soc Cardiovasc Angiogr Interv. 2023;2(3):100577. doi:10.1016/j.jscai.2022.100577 (also JACC Cardiovasc Interv. 2023;16(11):1384-1400 and Heart Rhythm 2023) — "Preprocedural imaging", recommendation 3: TEE at 0°, 45°, 90° and 135° "along the axis of the circumflex artery to identify the maximal width of the LAA landing zone"; on CT the landing zone is measured on 3D multiplanar images "at the level of the circumflex artery in the mid-to-late systolic phase"; Sade LE, Faletra FF, Pontone G, et al. The role of multi-modality imaging for the assessment of left atrium and left atrial appendage: a clinical consensus statement of the European Association of Cardiovascular Imaging (EACVI), European Heart Rhythm Association (EHRA) of the European Society of Cardiology (ESC). Eur Heart J Cardiovasc Imaging. 2025;26(3):385-413. doi:10.1093/ehjci/jeaf014 — p. 406: sizing "aims to determine the maximum landing zone diameter at the level of the left circumflex artery"
- **Proposed fix:** Optional: name the plane (at the level of the circumflex artery) and the phase (mid-to-late systole, SCAI/HRS 2023); the page gives no phase.
- **Proposed home:** LAAO planning CT › Measurement

### B3-laao-ct-05 · Key measurements: minimum diameter, area and LSPV rows

- **Verdict:** source-not-readable
- **Kind:** protocol · **Topic:** LAAO planning CT
- **The page says:** "LAA ostium min D | Narrowest diameter | Elliptical — both dimensions needed"; "LAA ostium area | Planimetry | Alternative to diameters"; "LAA to LSPV | Relationship — avoid impinging PV".
- **Source:** Sade LE, Faletra FF, Pontone G, et al. The role of multi-modality imaging for the assessment of left atrium and left atrial appendage: a clinical consensus statement of the European Association of Cardiovascular Imaging (EACVI), European Heart Rhythm Association (EHRA) of the European Society of Cardiology (ESC). Eur Heart J Cardiovasc Imaging. 2025;26(3):385-413. doi:10.1093/ehjci/jeaf014 — p. 386: the LAA has a "well-defined, usually oval orifice (the ostium)"; Boston Scientific. WATCHMAN Left Atrial Appendage Closure Device with Delivery System, and WATCHMAN FLX Left Atrial Appendage Closure Device with Delivery System: directions for use. Labeling approved by the US FDA with PMA P130013/S035, July 21, 2020. — Watchman FLX instructions, pp. 56–57: device choice is by the maximum ostium width only (no minimum diameter or area); Korsholm K, Berti S, Iriart X, et al. Expert recommendations on cardiac computed tomography for planning transcatheter left atrial appendage occlusion. JACC Cardiovasc Interv. 2020;13(3):277-292. doi:10.1016/j.jcin.2019.08.054 — Not read: the expert CT recommendations for LAAO planning (morphology, ostium and landing-zone measurement, sizing by device); jacc.org and sciencedirect.com answered 403 behind a Cloudflare bot check on 2026-11-27 (owner asked for a copy)
- **Proposed fix:** Keep "oval" (EACVI p. 386); the use of the minimum diameter and area and the LSPV line need a readable source (Korsholm 2020).
- **Proposed home:** LAAO planning CT › Measurement

### B3-laao-ct-06 · Key measurements: landing zone

- **Verdict:** wrong · **management**
- **Kind:** guideline-threshold · **Topic:** LAAO planning CT
- **The page says:** "Landing zone D | 1–2 cm from ostium | Where device sits".
- **Source:** Sade LE, Faletra FF, Pontone G, et al. The role of multi-modality imaging for the assessment of left atrium and left atrial appendage: a clinical consensus statement of the European Association of Cardiovascular Imaging (EACVI), European Heart Rhythm Association (EHRA) of the European Society of Cardiology (ESC). Eur Heart J Cardiovasc Imaging. 2025;26(3):385-413. doi:10.1093/ehjci/jeaf014 — p. 406: "Device sizing aims to determine the maximum landing zone diameter at the level of the left circumflex artery"; Saw J, Holmes DR, Cavalcante JL, et al. SCAI/HRS expert consensus statement on transcatheter left atrial appendage closure. J Soc Cardiovasc Angiogr Interv. 2023;2(3):100577. doi:10.1016/j.jscai.2022.100577 (also JACC Cardiovasc Interv. 2023;16(11):1384-1400 and Heart Rhythm 2023) — "Preprocedural imaging", recommendation 3 and Figure 2: the landing zone is measured at the level of the circumflex artery (CT in mid-to-late systole); Boston Scientific. WATCHMAN Left Atrial Appendage Closure Device with Delivery System, and WATCHMAN FLX Left Atrial Appendage Closure Device with Delivery System: directions for use. Labeling approved by the US FDA with PMA P130013/S035, July 21, 2020. — Watchman FLX instructions, p. 58, release criteria "Position": the plane of maximum device diameter "should be at, or just distal to, the LAA ostium"
- **Proposed fix:** Define the landing zone as the readable sources do: the maximum diameter at the level of the circumflex artery, measured in mid-to-late systole (SCAI/HRS 2023; EACVI p. 406). If the row was meant for lobe-and-disc devices (Amulet), say so and take that device's definition from its instructions for use (not read).
- **Proposed home:** LAAO planning CT › Measurement

### B3-laao-ct-07 · Key measurements: LAA depth

- **Verdict:** wrong · **management**
- **Kind:** guideline-threshold · **Topic:** LAAO planning CT
- **The page says:** "LAA depth | From ostium to tip (or first bend) | Must be ≥ device length".
- **Source:** Boston Scientific. WATCHMAN Left Atrial Appendage Closure Device with Delivery System, and WATCHMAN FLX Left Atrial Appendage Closure Device with Delivery System: directions for use. Labeling approved by the US FDA with PMA P130013/S035, July 21, 2020. — Watchman FLX instructions, p. 57, step 7B: "The LAA depth should be approximately half the labeled implant diameter or longer"; the older Watchman instructions, p. 26, step 6B: "The LAA depth must be at least as long as the LAA ostium width"; Saw J, Holmes DR, Cavalcante JL, et al. SCAI/HRS expert consensus statement on transcatheter left atrial appendage closure. J Soc Cardiovasc Angiogr Interv. 2023;2(3):100577. doi:10.1016/j.jscai.2022.100577 (also JACC Cardiovasc Interv. 2023;16(11):1384-1400 and Heart Rhythm 2023) — "Preprocedural imaging", recommendation 3: depth "from the centroid of the landing zone as a straight line to the main body of the LAA"; Figure 2: on CT, from the centroid of the landing zone to the centre of the periapical region of the main lobe, not to accessory lobes
- **Proposed fix:** Measure depth from the centre of the landing zone to the periapical region of the main lobe (SCAI/HRS 2023, Figure 2); for the Watchman FLX the depth should be about half the labelled device diameter or more (instructions p. 57), not the whole device length.
- **Proposed home:** LAAO planning CT › Measurement

### B3-laao-ct-08 · Thrombus protocol: delayed phase timing

- **Verdict:** correct
- **Kind:** guideline-threshold · **Topic:** LAAO planning CT
- **The page says:** Box title "Delayed Phase (60 s)".
- **Source:** Sade LE, Faletra FF, Pontone G, et al. The role of multi-modality imaging for the assessment of left atrium and left atrial appendage: a clinical consensus statement of the European Association of Cardiovascular Imaging (EACVI), European Heart Rhythm Association (EHRA) of the European Society of Cardiology (ESC). Eur Heart J Cardiovasc Imaging. 2025;26(3):385-413. doi:10.1093/ehjci/jeaf014 — p. 393: "An additional delayed scan after contrast injection is mandatory for ruling out LAA thrombus. While the time to delayed images varied in studies, most were acquired 30–180 s after the initial images."; Saw J, Holmes DR, Cavalcante JL, et al. SCAI/HRS expert consensus statement on transcatheter left atrial appendage closure. J Soc Cardiovasc Angiogr Interv. 2023;2(3):100577. doi:10.1016/j.jscai.2022.100577 (also JACC Cardiovasc Interv. 2023;16(11):1384-1400 and Heart Rhythm 2023) — "Preprocedural imaging", recommendation 3: "A late-pass delayed scan is recommended to allow adequate contrast mixing to avoid overinterpretation of the thrombus in the LAA" (no time given); Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — "Cardiac Masses", PDF p. 8 (p. 509): for LAA thrombi "priming boluses or delayed phase imaging are often required to differentiate slow flow from true thrombi"; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 1 Coronary CT Angiography (CCTA). Can Assoc Radiol J. 2024;75(3):488-501. doi:10.1177/08465371241233240 — Table 1, PDF p. 3 (p. 490), LAA closure row: "Delayed imaging may be required"
- **Proposed fix:** Optional: give the range the studies used (30–180 s, EACVI p. 393) rather than one value presented as the standard.
- **Proposed home:** LAAO planning CT › Technique

### B3-laao-ct-09 · Thrombus protocol: reading the delayed phase

- **Verdict:** wrong · **management**
- **Kind:** guideline-threshold · **Topic:** LAAO planning CT
- **The page says:** "Residual enhancement on delayed phase effectively excludes thrombus. Absence of fill-in on delayed phase = LAA thrombus".
- **Source:** Sade LE, Faletra FF, Pontone G, et al. The role of multi-modality imaging for the assessment of left atrium and left atrial appendage: a clinical consensus statement of the European Association of Cardiovascular Imaging (EACVI), European Heart Rhythm Association (EHRA) of the European Society of Cardiology (ESC). Eur Heart J Cardiovasc Imaging. 2025;26(3):385-413. doi:10.1093/ehjci/jeaf014 — p. 394: with an arterial phase alone CT's positive predictive value for LAA thrombus was 41%; adding a delayed (venous) phase raised it to 92%, with 99% overall accuracy; p. 396, Figure 12: a defect persisting into the late phase is "consistent with thrombus"; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — "Cardiac Masses", PDF p. 8 (p. 509): in severely dilated left atria, prone imaging helps opacify the anterior LAA, which may stay sub-optimally opacified "due to poor atrial function and stasis"; Saw J, Holmes DR, Cavalcante JL, et al. SCAI/HRS expert consensus statement on transcatheter left atrial appendage closure. J Soc Cardiovasc Angiogr Interv. 2023;2(3):100577. doi:10.1016/j.jscai.2022.100577 (also JACC Cardiovasc Interv. 2023;16(11):1384-1400 and Heart Rhythm 2023) — "Preprocedural imaging", recommendation 3: the late-pass delayed scan is there "to avoid overinterpretation of the thrombus in the LAA"
- **Proposed fix:** Say: complete filling on the delayed phase excludes thrombus; a defect that persists on the delayed phase is consistent with thrombus (positive predictive value about 92%, EACVI p. 394), and in a severely dilated LA consider prone imaging before calling it (CAR p. 509). Replace "residual enhancement" with "complete filling".
- **Question for the owner:** When a filling defect persists on the delayed phase, should the report call it thrombus, or "consistent with thrombus" with TOE (or prone imaging) suggested to confirm? That is a reporting choice for your practice.
- **Proposed home:** LAAO planning CT › Reporting

### B3-laao-ct-10 · Thrombus protocol: action when thrombus is present

- **Verdict:** correct
- **Kind:** guideline-threshold · **Topic:** LAAO planning CT
- **The page says:** "→ do **NOT** proceed to closure until resolved."
- **Source:** Boston Scientific. WATCHMAN Left Atrial Appendage Closure Device with Delivery System, and WATCHMAN FLX Left Atrial Appendage Closure Device with Delivery System: directions for use. Labeling approved by the US FDA with PMA P130013/S035, July 21, 2020. — Watchman FLX instructions, p. 31, Contraindications: "Do not use the WATCHMAN FLX Device if: Intracardiac thrombus is present."; US Food and Drug Administration. Summary of Safety and Effectiveness Data: WATCHMAN FLX Left Atrial Appendage (LAA) Closure Technology; WATCHMAN FLX and WATCHMAN FLX Pro LAA Closure Devices with Delivery System (Boston Scientific). PMA P130013/S074, approved July 16, 2025. — p. 2, III Contraindications (FLX and FLX Pro): "Intracardiac thrombus is present."; Sade LE, Faletra FF, Pontone G, et al. The role of multi-modality imaging for the assessment of left atrium and left atrial appendage: a clinical consensus statement of the European Association of Cardiovascular Imaging (EACVI), European Heart Rhythm Association (EHRA) of the European Society of Cardiology (ESC). Eur Heart J Cardiovasc Imaging. 2025;26(3):385-413. doi:10.1093/ehjci/jeaf014 — p. 405, "LAA closure": "It is advised to exclude LAA thrombus before percutaneous LAA closure in every patient."; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — LAA closure section, PDF p. 8 (p. 509): pre-procedural imaging is key to identifying contraindications
- **Proposed home:** LAAO planning CT › Management

### B3-laao-ct-11 · Watchman sizing: ostium up to 31.5 mm

- **Verdict:** wrong · **management**
- **Kind:** guideline-threshold · **Topic:** LAAO planning CT
- **The page says:** "Max LAA ostium D ≤31.5 mm | Standard Watchman FLX".
- **Source:** US Food and Drug Administration. Summary of Safety and Effectiveness Data: WATCHMAN FLX Left Atrial Appendage (LAA) Closure Technology; WATCHMAN FLX and WATCHMAN FLX Pro LAA Closure Devices with Delivery System (Boston Scientific). PMA P130013/S074, approved July 16, 2025. — Table 1, p. 4: Watchman FLX 20, 24, 27, 31 and 35 mm for a maximum ostium of 14.0–18.0, 16.8–21.6, 18.9–24.3, 21.7–27.9 and 24.5–31.5 mm; p. 3: sizing by fluoroscopy and echo during the procedure or by cardiac CT or TEE before it; Boston Scientific. WATCHMAN Left Atrial Appendage Closure Device with Delivery System, and WATCHMAN FLX Left Atrial Appendage Closure Device with Delivery System: directions for use. Labeling approved by the US FDA with PMA P130013/S035, July 21, 2020. — Watchman FLX instructions, p. 56: "Measured maximum LAA ostium width must be ≥ 14.0 mm and ≤ 31.5 mm to accommodate available Closure Device sizes"; p. 57, Table 45 note: "These values are based on TEE. Other imaging modalities may vary."; Saw J, Holmes DR, Cavalcante JL, et al. SCAI/HRS expert consensus statement on transcatheter left atrial appendage closure. J Soc Cardiovasc Angiogr Interv. 2023;2(3):100577. doi:10.1016/j.jscai.2022.100577 (also JACC Cardiovasc Interv. 2023;16(11):1384-1400 and Heart Rhythm 2023) — "Preprocedural imaging", recommendation 3: "LAA measurements on cardiac CT tend to be 2- to 3-mm larger than TEE measurements"; Sade LE, Faletra FF, Pontone G, et al. The role of multi-modality imaging for the assessment of left atrium and left atrial appendage: a clinical consensus statement of the European Association of Cardiovascular Imaging (EACVI), European Heart Rhythm Association (EHRA) of the European Society of Cardiology (ESC). Eur Heart J Cardiovasc Imaging. 2025;26(3):385-413. doi:10.1093/ehjci/jeaf014 — p. 406: sizing by CT "tends to be 2–3 mm larger than TOE"
- **Proposed fix:** Give the full range: Watchman FLX for a maximum ostium of 14.0–31.5 mm (below 14.0 mm the appendage does not accommodate the device), and say the ranges are TEE-based, with CT measuring 2–3 mm larger.
- **Proposed home:** LAAO planning CT › Management

### B3-laao-ct-12 · Watchman sizing: ostium over 31.5 mm

- **Verdict:** correct
- **Kind:** guideline-threshold · **Topic:** LAAO planning CT
- **The page says:** "Max LAA ostium D >31.5 mm | Larger device or alternative".
- **Source:** US Food and Drug Administration. Summary of Safety and Effectiveness Data: WATCHMAN FLX Left Atrial Appendage (LAA) Closure Technology; WATCHMAN FLX and WATCHMAN FLX Pro LAA Closure Devices with Delivery System (Boston Scientific). PMA P130013/S074, approved July 16, 2025. — p. 3: the Watchman FLX Pro comes in the same five sizes "but have an additional 40 mm size"; Table 1, p. 4: FLX Pro 40 mm for a maximum ostium of 28.0–36.0 mm
- **Proposed fix:** Optional: name the larger device (Watchman FLX Pro 40 mm, maximum ostium 28.0–36.0 mm) and say that above 36 mm another device is needed.
- **Proposed home:** LAAO planning CT › Management

### B3-laao-ct-13 · Watchman sizing: device size and compression rule

- **Verdict:** outdated · **management**
- **Kind:** guideline-threshold · **Topic:** LAAO planning CT
- **The page says:** Sizing table: "Device size | Max ostium D + 3–6 mm (8–20% compression target)"; measurements table: "LAA ostium max D | … | Device size = ostium D + 3–6 mm".
- **Source:** Boston Scientific. WATCHMAN Left Atrial Appendage Closure Device with Delivery System, and WATCHMAN FLX Left Atrial Appendage Closure Device with Delivery System: directions for use. Labeling approved by the US FDA with PMA P130013/S035, July 21, 2020. — Watchman FLX instructions, p. 57, Table 45 ("Max LAA Ostium Width and/or Deployed Closure Device Diameter"): 20 mm for 14.0–18.0, 24 for 16.8–21.6, 27 for 18.9–24.3, 31 for 21.7–27.9, 35 for 24.5–31.5 mm, each range 70–90% of the device size (10–30% compression; the text gives no percentage); p. 58, release criterion "Size (compression)": use Table 45. Older Watchman instructions: Table 45, p. 26 (21–33 mm devices for a 17–31 mm ostium) and Table 46, p. 28 (deployed diameter "80-92% of original", that is 8–20% compression); US Food and Drug Administration. Summary of Safety and Effectiveness Data: WATCHMAN FLX Left Atrial Appendage (LAA) Closure Technology; WATCHMAN FLX and WATCHMAN FLX Pro LAA Closure Devices with Delivery System (Boston Scientific). PMA P130013/S074, approved July 16, 2025. — Table 1, p. 4 (2025): the same FLX ranges, plus the FLX Pro 40 mm for 28.0–36.0 mm; Saw J, Holmes DR, Cavalcante JL, et al. SCAI/HRS expert consensus statement on transcatheter left atrial appendage closure. J Soc Cardiovasc Angiogr Interv. 2023;2(3):100577. doi:10.1016/j.jscai.2022.100577 (also JACC Cardiovasc Interv. 2023;16(11):1384-1400 and Heart Rhythm 2023) — "Preprocedural imaging", recommendation 3: device sizing "should take into account that LAA measurements on cardiac CT tend to be 2- to 3-mm larger than TEE measurements"
- **Proposed fix:** Replace the rule with the Watchman FLX/FLX Pro table (choose by maximum ostium width; the deployed device about 10–30% compressed), say the table is TEE-based and CT measures 2–3 mm larger, and drop "ostium + 3–6 mm", which neither set of instructions gives. The 8–20% target is the older Watchman's.
- **Question for the owner:** Should the page give device sizing at all, or only the measurements, leaving device choice to the implanters and the instructions for use (SCAI/HRS 2023 refers operators to the instructions)?
- **Proposed home:** LAAO planning CT › Management

### B3-laao-ct-14 · Front-page row (shared/data/resources.ts, id laao-ct)

- **Verdict:** correct
- **Kind:** listing · **Topic:** LAAO planning CT
- **The page says:** Title "LAAO planning CT", version "none", summary "Left atrial appendage anatomy, measurements, thrombus imaging and Watchman sizing."
- **Source:** Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — LAA closure section, PDF p. 8 (p. 509): no versioned LAAO CT guideline; US Food and Drug Administration. Summary of Safety and Effectiveness Data: WATCHMAN FLX Left Atrial Appendage (LAA) Closure Technology; WATCHMAN FLX and WATCHMAN FLX Pro LAA Closure Devices with Delivery System (Boston Scientific). PMA P130013/S074, approved July 16, 2025. — Table 1, p. 4: Watchman sizing
- **Proposed fix:** The page states no version, so "none" is right and the summary matches the page; if the sizing section is removed or rewritten (B3-laao-ct-13), update "Watchman sizing".
- **Proposed home:** Front page row: LAAO planning CT

## Valve grading

https://dfergs93.github.io/cardiac-imaging-resources/valves/

### B3-valve-grading-01 · Opening line: what the page is based on

- **Verdict:** correct
- **Kind:** provenance · **Topic:** Valvular heart disease
- **The page says:** "Quick-reference severity grading for stenosis and regurgitation. Based on ACC/AHA 2020, ESC/EACTS 2025, and ASE 2017 guidelines; AR section updated with CMR outcome-based thresholds from JACC state-of-the-art reviews." There is no reference box; the only full citations are the two AR reviews (Ranard 2023, Pawar 2026); other sources appear only as names in the text (Myerson, Malahfji, Hahn / Go 2018, Adamo 2025).
- **Source:** Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — Title page e72 (PDF p. 1): the 2020 ACC/AHA VHD guideline, still the current ACC/AHA version; Praz F, Borger MA, Lanz J, et al. 2025 ESC/EACTS Guidelines for the management of valvular heart disease. Eur Heart J. 2025;46(44):4635-4736. doi:10.1093/eurheartj/ehaf194 (co-published in Eur J Cardiothorac Surg. 2025;67(8):ezaf276. doi:10.1093/ejcts/ezaf276). — Title page p. 1; section 7.2 p. 25 and Figure 4 p. 26: severity is graded by an integrative approach citing the EACVI recommendations (ref. 45); no grading tables of its own; Baumgartner H, Hung J, Bermejo J, et al. Recommendations on the echocardiographic assessment of aortic valve stenosis: a focused update from the European Association of Cardiovascular Imaging and the American Society of Echocardiography. J Am Soc Echocardiogr. 2017;30(4):372-392. doi:10.1016/j.echo.2017.02.009 — Title page p. 372 (PDF p. 1): ASE/EACVI 2017 focused update on aortic stenosis; Zoghbi WA, Adams D, Bonow RO, et al. Recommendations for noninvasive evaluation of native valvular regurgitation: a report from the American Society of Echocardiography developed in collaboration with the Society for Cardiovascular Magnetic Resonance. J Am Soc Echocardiogr. 2017;30(4):303-371. doi:10.1016/j.echo.2017.01.007 — Title page p. 303 (PDF p. 1): ASE/SCMR 2017 native valvular regurgitation; Baumgartner H, Hung J, Bermejo J, et al. Echocardiographic assessment of valve stenosis: EAE/ASE recommendations for clinical practice. J Am Soc Echocardiogr. 2009;22(1):1-23. doi:10.1016/j.echo.2008.11.029 — p. 1, ASE's added note (use the 2014 AHA/ACC mitral stenosis stages instead of the 2009 values); Table 9 p. 17 and Table 11 p. 20 are the page's MS and PS tables, but the page does not name this document; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — p. 4 (print 505), Valvular Assessment: CT is less useful for grading native stenosis or regurgitation; CAR gives no grading thresholds, so the echo/CMR documents lead
- **Proposed fix:** Optional: cite each document in full (ASE/EACVI 2017 AS update, ASE/SCMR 2017 regurgitation, EAE/ASE 2009 stenosis for MS/PS, ACC/AHA 2020, ESC/EACTS 2025) and cite the CMR outcome thresholds to their primary papers, not the reviews.
- **Question for the owner:** Which body leads severity stages and intervention thresholds on this page: ACC/AHA 2020 or ESC/EACTS 2025 (where they differ the page would give both)? Echo grading follows the ASE/EACVI documents either way.
- **Proposed home:** Valvular heart disease › Background

### B3-valve-grading-02 · Aortic stenosis table: mean gradient for mild and moderate

- **Verdict:** wrong · **management**
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** Mean Gradient (mmHg): Mild "<25", Moderate "25–39" (Severe "≥40", Very Severe "≥60").
- **Source:** Baumgartner H, Hung J, Bermejo J, et al. Recommendations on the echocardiographic assessment of aortic valve stenosis: a focused update from the European Association of Cardiovascular Imaging and the American Society of Echocardiography. J Am Soc Echocardiogr. 2017;30(4):372-392. doi:10.1016/j.echo.2017.02.009 — Table 3 'Recommendations for grading of AS severity', p. 383 (PDF p. 12): mean gradient mild <20, moderate 20–40, severe ≥40 mmHg; Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — Table 13 'Stages of AS', stage B, e91 (PDF p. 20): mild AS mean ΔP <20 mmHg, moderate AS mean ΔP 20–39 mmHg; Table 5 e81 (PDF p. 10): echo every 3–5 y for mild AS, every 1–2 y for moderate
- **Proposed fix:** Mild <20 mmHg; moderate 20–39 mmHg (ACC/AHA; ASE/EACVI writes 20–40). A gradient of 20–24 mmHg is moderate, not mild.
- **Proposed home:** Valvular heart disease › Categories

### B3-valve-grading-03 · Aortic stenosis table: Vmax, severe mean gradient, AVA, AVAi and DI (mild to severe)

- **Verdict:** correct
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** Vmax (m/s): Mild "2.0–2.9", Moderate "3.0–3.9", Severe "≥4.0"; mean gradient Severe "≥40"; AVA (cm²) ">1.5", "1.0–1.5", "<1.0"; AVAi (cm²/m²) ">0.85", "0.60–0.85", "<0.60"; DI ">0.50", "0.25–0.50", "<0.25".
- **Source:** Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — Table 13, e91 (PDF p. 20): mild Vmax 2.0–2.9, moderate 3.0–3.9, severe ≥4 m/s or mean ΔP ≥40; severe AVA typically ≤1.0 cm² (AVAi ≤0.6); e92 item 4 (PDF p. 21): velocity ratio ≤0.25 consistent with severe AS; Baumgartner H, Hung J, Bermejo J, et al. Recommendations on the echocardiographic assessment of aortic valve stenosis: a focused update from the European Association of Cardiovascular Imaging and the American Society of Echocardiography. J Am Soc Echocardiogr. 2017;30(4):372-392. doi:10.1016/j.echo.2017.02.009 — Table 3, p. 383 (PDF p. 12): aortic sclerosis Vmax ≤2.5; mild 2.6–2.9, moderate 3.0–4.0, severe ≥4.0 m/s; AVA >1.5, 1.0–1.5, <1.0; AVAi >0.85, 0.60–0.85, <0.6; velocity ratio >0.50, 0.25–0.50, <0.25
- **Proposed fix:** Optional: say where the two differ: ASE/EACVI calls Vmax ≤2.5 m/s aortic sclerosis (mild 2.6–2.9) and puts moderate at 3.0–4.0; ACC/AHA writes ≤1.0 cm², ≤0.6 cm²/m² and ≤0.25 for severe.
- **Proposed home:** Valvular heart disease › Categories

### B3-valve-grading-04 · Aortic stenosis table: very severe row

- **Verdict:** unsourced · **management**
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** Very Severe: Vmax "≥5.0", mean gradient "≥60", AVA "<0.6" cm², AVAi "—", DI "—".
- **Source:** Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — Table 13 stage C1, e91 (PDF p. 20): 'Very severe AS is an aortic Vmax ≥5 m/s or mean P ≥60 mm Hg' (no valve-area criterion); AS timing recommendation 7, e94 (PDF p. 23): asymptomatic very severe AS (velocity ≥5 m/s) and low surgical risk, AVR reasonable (2a); Baumgartner H, Hung J, Bermejo J, et al. Recommendations on the echocardiographic assessment of aortic valve stenosis: a focused update from the European Association of Cardiovascular Imaging and the American Society of Echocardiography. J Am Soc Echocardiogr. 2017;30(4):372-392. doi:10.1016/j.echo.2017.02.009 — Table 3, p. 383 (PDF p. 12): no very severe grade; Praz F, Borger MA, Lanz J, et al. 2025 ESC/EACTS Guidelines for the management of valvular heart disease. Eur Heart J. 2025;46(44):4635-4736. doi:10.1093/eurheartj/ehaf194 (co-published in Eur J Cardiothorac Surg. 2025;67(8):ezaf276. doi:10.1093/ejcts/ezaf276). — Section 8.2.1 p. 29 and Recommendation Table 4 p. 36: no very severe grade; asymptomatic severe high-gradient AS with LVEF ≥50% and low procedural risk, intervention IIa
- **Proposed fix:** Keep Vmax ≥5.0 m/s or mean gradient ≥60 mmHg (ACC/AHA); drop AVA <0.6 cm², which no readable guideline uses to define very severe AS.
- **Question for the owner:** AVA <0.6 cm² as 'very severe' is in none of the readable guidelines: is it a local convention to keep and label, or should it go?
- **Proposed home:** Valvular heart disease › Categories

### B3-valve-grading-05 · Low-flow low-gradient AS tip: classic and paradoxical definitions

- **Verdict:** correct
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** "Classic LFLG: EF <50%, AVA <1.0 cm², mean gradient <40 mmHg → dobutamine stress echo"; "Paradoxical LFLG: EF ≥50%, AVA <1.0 cm², mean gradient <40 mmHg, SVi <35 mL/m²".
- **Source:** Baumgartner H, Hung J, Bermejo J, et al. Recommendations on the echocardiographic assessment of aortic valve stenosis: a focused update from the European Association of Cardiovascular Imaging and the American Society of Echocardiography. J Am Soc Echocardiogr. 2017;30(4):372-392. doi:10.1016/j.echo.2017.02.009 — Low Flow, Low Gradient AS with Reduced EF, p. 384 (PDF p. 13): AVA <1.0 cm², mean gradient <40 mmHg, LVEF <50%, SVi <35 mL/m²; low-dose DSE (Table 4); with Preserved EF, p. 385 (PDF p. 14): SVi <35 mL/m² despite normal EF; Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — Table 13 stages D2 and D3, e91 (PDF p. 20): D2 AVA ≤1.0 cm², Vmax <4 or mean ΔP <40, LVEF <50%, DSE; D3 AVA ≤1.0, mean ΔP <40, SVi <35 mL/m², LVEF ≥50%; Praz F, Borger MA, Lanz J, et al. 2025 ESC/EACTS Guidelines for the management of valvular heart disease. Eur Heart J. 2025;46(44):4635-4736. doi:10.1093/eurheartj/ehaf194 (co-published in Eur J Cardiothorac Surg. 2025;67(8):ezaf276. doi:10.1093/ejcts/ezaf276). — Section 8.2.1, p. 29: reduced LVEF mean gradient <40, AVA ≤1 cm², SVi ≤35 mL/m², LVEF <50%; preserved LVEF same with LVEF ≥50%; DSE flow reserve ≥20%
- **Proposed fix:** Optional: add SVi <35 mL/m² to the classic definition (ASE/EACVI p. 384; ESC ≤35).
- **Proposed home:** Valvular heart disease › Categories

### B3-valve-grading-06 · Low-flow low-gradient AS tip: CT in discordant cases

- **Verdict:** wrong · **management**
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** "CT planimetry of valve area helpful in discordant cases"
- **Source:** Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — Valvular Assessment, p. 4 (print 505): 'Cardiac CT is less useful for evaluating the severity of native valve stenosis or regurgitation. Planimetry of aortic valve stenosis can be achieved with CT but tends to overestimate valve area as compared to TTE'; aortic valve calcium scoring 'is particularly helpful in low flow, low gradient aortic stenosis'; TAVR section p. 6 (print 507): calcium score may help confirm severe AS in suspected low-flow low-gradient AS; Baumgartner H, Hung J, Bermejo J, et al. Recommendations on the echocardiographic assessment of aortic valve stenosis: a focused update from the European Association of Cardiovascular Imaging and the American Society of Echocardiography. J Am Soc Echocardiogr. 2017;30(4):372-392. doi:10.1016/j.echo.2017.02.009 — Table 5, p. 385 (PDF p. 14): calcium score by MSCT, severe AS likely men ≥2000 / women ≥1200 AU, very likely ≥3000 / ≥1600, unlikely <1600 / <800; p. 383 (PDF p. 12): the effective orifice area is significantly smaller than the anatomic AVA; Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — Section 3.2.1.1 item 5, e92 (PDF p. 21): CT aortic valve calcium is especially useful in low-flow low-gradient AS; severe AS thresholds 1300 AU women, 2000 AU men; Praz F, Borger MA, Lanz J, et al. 2025 ESC/EACTS Guidelines for the management of valvular heart disease. Eur Heart J. 2025;46(44):4635-4736. doi:10.1093/eurheartj/ehaf194 (co-published in Eur J Cardiothorac Surg. 2025;67(8):ezaf276. doi:10.1093/ejcts/ezaf276). — Section 8.2.1, p. 29: >2000 AU men and >1200 AU women indicate severe AS; >3000 / >1600 very specific; severe unlikely <1600 / <800
- **Proposed fix:** Replace with the aortic valve calcium score (non-contrast CT, Agatston) for discordant low-gradient AS, with sex-specific thresholds; say CT planimetry overestimates valve area (CAR 2024).
- **Question for the owner:** Which calcium-score thresholds should the page give: ACC/AHA 2020 (severe ≥1300 AU women, ≥2000 men) or ASE/EACVI and ESC 2025 (likely ≥1200 / ≥2000, very likely ≥1600 / ≥3000, unlikely <800 / <1600)?
- **Proposed home:** Valvular heart disease › Technique

### B3-valve-grading-07 · AVA by continuity equation

- **Verdict:** correct
- **Kind:** teaching · **Topic:** Valvular heart disease
- **The page says:** "AVA = (CSA_LVOT × VTI_LVOT) / VTI_AV"
- **Source:** Baumgartner H, Hung J, Bermejo J, et al. Recommendations on the echocardiographic assessment of aortic valve stenosis: a focused update from the European Association of Cardiovascular Imaging and the American Society of Echocardiography. J Am Soc Echocardiogr. 2017;30(4):372-392. doi:10.1016/j.echo.2017.02.009 — Table 2 'Measures of AS severity', p. 376 (PDF p. 5), continuity equation AVA = (CSA_LVOT × VTI_LVOT)/VTI_AV; derivation in the AVA section
- **Proposed home:** Valvular heart disease › Measurement

### B3-valve-grading-08 · Aortic regurgitation echo table: RF, RVol and EROA, with caption

- **Verdict:** correct
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** Mild RF "<30", RVol "<30", EROA "<0.10"; Moderate "30–39", "30–44", "0.10–0.19"; Moderate–Severe "40–49", "45–59", "0.20–0.29"; Severe "≥50", "≥60", "≥0.30". Caption: "ACC/AHA 2020 / ASE 2017 integrated echocardiographic grading."
- **Source:** Zoghbi WA, Adams D, Bonow RO, et al. Recommendations for noninvasive evaluation of native valvular regurgitation: a report from the American Society of Echocardiography developed in collaboration with the Society for Cardiovascular Magnetic Resonance. J Am Soc Echocardiogr. 2017;30(4):303-371. doi:10.1016/j.echo.2017.01.007 — Table 11 'Grading the severity of chronic AR with echocardiography', p. 340 (PDF p. 38): RVol <30, 30–44, 45–59, ≥60 mL; RF <30, 30–39, 40–49, ≥50%; EROA <0.10, 0.10–0.19, 0.20–0.29, ≥0.30 cm² (moderate split into two subgroups); Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — Table 15 'Stages of Chronic AR', e105 (PDF p. 34): moderate RVol 30–59, RF 30–49%, ERO 0.10–0.29; severe RVol ≥60, RF ≥50%, ERO ≥0.3, and 'diagnosis of chronic severe AR requires evidence of LV dilation'; Praz F, Borger MA, Lanz J, et al. 2025 ESC/EACTS Guidelines for the management of valvular heart disease. Eur Heart J. 2025;46(44):4635-4736. doi:10.1093/eurheartj/ehaf194 (co-published in Eur J Cardiothorac Surg. 2025;67(8):ezaf276. doi:10.1093/ejcts/ezaf276). — Figure 4, p. 26: EROA ≥30 mm², RVol ≥60 mL/beat, RF >50% (echo)
- **Proposed fix:** Optional: add that ACC/AHA requires LV dilation for chronic severe AR, and that ESC 2025 writes RF >50% for echo.
- **Proposed home:** Valvular heart disease › Categories

### B3-valve-grading-09 · Aortic regurgitation echo table: vena contracta

- **Verdict:** wrong · **management**
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** Vena Contracta (mm): Mild "<3", Moderate "3–5.9", Moderate–Severe "—", Severe "≥6".
- **Source:** Zoghbi WA, Adams D, Bonow RO, et al. Recommendations for noninvasive evaluation of native valvular regurgitation: a report from the American Society of Echocardiography developed in collaboration with the Society for Cardiovascular Magnetic Resonance. J Am Soc Echocardiogr. 2017;30(4):303-371. doi:10.1016/j.echo.2017.01.007 — Table 11, p. 340 (PDF p. 38): VCW <0.3, 0.3–0.6, >0.6 cm; Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — Table 15, e105 (PDF p. 34): moderate vena contracta 0.3–0.6 cm; severe >0.6 cm; Praz F, Borger MA, Lanz J, et al. 2025 ESC/EACTS Guidelines for the management of valvular heart disease. Eur Heart J. 2025;46(44):4635-4736. doi:10.1093/eurheartj/ehaf194 (co-published in Eur J Cardiothorac Surg. 2025;67(8):ezaf276. doi:10.1093/ejcts/ezaf276). — Figure 4, p. 26: severe AR 'Vena contracta >6 mm'
- **Proposed fix:** Moderate 3–6 mm, severe >6 mm: a vena contracta of exactly 6 mm is moderate in all three sources, severe on the page.
- **Proposed home:** Valvular heart disease › Categories

### B3-valve-grading-10 · AR CMR section: opening statement on CMR grades

- **Verdict:** wrong · **management**
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** "Formal CMR-specific severity grades have not been established in guidelines; ASE 2017 applies echocardiographic cut-offs to CMR by default. Accumulating outcome data support lower CMR-specific thresholds for hemodynamically significant AR"
- **Source:** Zoghbi WA, Adams D, Bonow RO, et al. Recommendations for noninvasive evaluation of native valvular regurgitation: a report from the American Society of Echocardiography developed in collaboration with the Society for Cardiovascular Magnetic Resonance. J Am Soc Echocardiogr. 2017;30(4):303-371. doi:10.1016/j.echo.2017.01.007 — 'Thresholds for regurgitation severity', p. 317 (PDF p. 15): paucity of CMR outcome thresholds; RF >40% (MR) and >33% (AR) linked to progression; 'the general cutoffs ... recommended by echocardiography and the recent ACC/AHA guidelines are used'; Praz F, Borger MA, Lanz J, et al. 2025 ESC/EACTS Guidelines for the management of valvular heart disease. Eur Heart J. 2025;46(44):4635-4736. doi:10.1093/eurheartj/ehaf194 (co-published in Eur J Cardiothorac Surg. 2025;67(8):ezaf276. doi:10.1093/ejcts/ezaf276). — Figure 4 'Imaging assessment of patients with aortic regurgitation', p. 26: quantitative criteria for severe AR include 'RF >40% (CMR)' beside 'RF >50% (echo)'; Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — Table 15, e105 (PDF p. 34): RF ≥50% for severe, no modality-specific value
- **Proposed fix:** Say that ESC/EACTS 2025 now counts CMR RF >40% as a criterion of severe AR (Figure 4), while ASE 2017 and ACC/AHA 2020 apply the echo cut-off (RF ≥50%).
- **Question for the owner:** For AR graded by CMR, should the page call RF >40% severe (ESC 2025) or keep the echo cut-off of ≥50% (ASE 2017, ACC/AHA 2020)?
- **Proposed home:** Valvular heart disease › Categories

### B3-valve-grading-11 · CMR AR outcome table: RF ≥32–35%

- **Verdict:** source-not-readable
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** RF "≥32–35%": "Predicts symptom progression, need for AVR, and adverse outcomes" (cited to Ranard 2023 and Pawar 2026).
- **Source:** Ranard LS, Bonow RO, Nishimura R, et al. Imaging methods for evaluation of chronic aortic regurgitation in adults: JACC state-of-the-art review. J Am Coll Cardiol. 2023;82(20):1953-1966. doi:10.1016/j.jacc.2023.08.051 — Not read (jacc.org bot check); the page's cited source; Pawar S, Allen C, Mori M, et al. Contemporary diagnosis and treatment of aortic regurgitation: a state-of-the-art review. J Am Coll Cardiol. 2026;87(4):385-413. doi:10.1016/j.jacc.2025.10.026 — Not read (closed access, bot check); the page's cited source; Hashimoto G, Enriquez-Sarano M, Stanberry LI, et al. Association of left ventricular remodeling assessment by cardiac magnetic resonance with outcomes in patients with chronic aortic regurgitation. JAMA Cardiol. 2022;7(9):924-933. doi:10.1001/jamacardio.2022.2108 — Abstract only (PubMed 35857306): aortic RF ≥32% independently associated with death, HF hospitalisation or NYHA progression in 178 patients with chronic moderate or severe AR and no or minimal symptoms; Hashimoto G, Enriquez-Sarano M, Stanberry LI, et al. JAMA Cardiol. 2022;7(9):924-933. doi:10.1001/jamacardio.2022.2108. Abstract, PubMed PMID 35857306. — Results, PMID 35857306: 'aortic regurgitant fraction of 32% or greater'
- **Proposed fix:** Cite Hashimoto 2022 for ≥32% and its composite endpoint; the 35% end has no readable source until the reviews (or the paper they cite) are supplied.
- **Proposed home:** Valvular heart disease › Background

### B3-valve-grading-12 · CMR AR outcome table: RF >33% (Myerson)

- **Verdict:** correct
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** RF ">33%": "85% vs 8% progression to surgery (Myerson et al)".
- **Source:** Myerson SG, d'Arcy J, Mohiaddin R, et al. Aortic regurgitation quantification using cardiovascular magnetic resonance: association with clinical outcome. Circulation. 2012;126(12):1452-1460. doi:10.1161/CIRCULATIONAHA.111.083600 — Abstract only (PubMed 22879371): 113 patients with echo moderate or severe AR; 85% of 39 with RF >33% progressed to surgery vs 8% of 74 with RF ≤33%; AUC 0.93; Myerson SG, d'Arcy J, Mohiaddin R, et al. Circulation. 2012;126(12):1452-1460. doi:10.1161/CIRCULATIONAHA.111.083600. Abstract, PubMed PMID 22879371. — Methods and Results, PMID 22879371; Zoghbi WA, Adams D, Bonow RO, et al. Recommendations for noninvasive evaluation of native valvular regurgitation: a report from the American Society of Echocardiography developed in collaboration with the Society for Cardiovascular Magnetic Resonance. J Am Soc Echocardiogr. 2017;30(4):303-371. doi:10.1016/j.echo.2017.01.007 — p. 317 (PDF p. 15): progression to symptoms and surgery seen with RF >33% for AR; Myerson SG, d'Arcy J, Christiansen JP, et al. Determination of clinical outcome in mitral regurgitation with cardiovascular magnetic resonance quantification. Circulation. 2016;133(23):2287-2296. doi:10.1161/CIRCULATIONAHA.115.017888 — Discussion, PDF p. 14: the earlier AR study's optimal thresholds were RF 33% or volume 42 mL
- **Proposed fix:** Optional: give the citation (Myerson 2012, Circulation 126:1452-60) and say the endpoint was progression to symptoms or other surgical indication.
- **Proposed home:** Valvular heart disease › Background

### B3-valve-grading-13 · CMR AR outcome table: RF ≥43% (Malahfji)

- **Verdict:** correct
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** RF "≥43%": "Optimal CMR threshold — multicenter study n=458 asymptomatic patients (Malahfji et al)".
- **Source:** Malahfji M, Crudo V, Kaolawanich Y, et al. Influence of cardiac remodeling on clinical outcomes in patients with aortic regurgitation. J Am Coll Cardiol. 2023;81(19):1885-1898. doi:10.1016/j.jacc.2023.03.001 — Abstract only (PubMed 36882135): multicentre, 458 asymptomatic patients with moderate or severe AR on CMR and preserved LVEF; optimal thresholds RVol 47 mL and RF 43%; Malahfji M, Crudo V, Kaolawanich Y, et al. J Am Coll Cardiol. 2023;81(19):1885-1898. doi:10.1016/j.jacc.2023.03.001. Abstract, PubMed PMID 36882135. — Methods and Results, PMID 36882135
- **Proposed fix:** Optional: give the citation (Malahfji 2023, J Am Coll Cardiol 81:1885-98) and the composite endpoint (symptoms, LVEF <50%, guideline LV-size indication, or death).
- **Proposed home:** Valvular heart disease › Background

### B3-valve-grading-14 · CMR AR outcome table: RVol >38–47 mL

- **Verdict:** source-not-readable
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** RVol ">38–47 mL": "ROC-optimal range for predicting AVR" (cited to Ranard 2023 and Pawar 2026).
- **Source:** Ranard LS, Bonow RO, Nishimura R, et al. Imaging methods for evaluation of chronic aortic regurgitation in adults: JACC state-of-the-art review. J Am Coll Cardiol. 2023;82(20):1953-1966. doi:10.1016/j.jacc.2023.08.051 — Not read (jacc.org bot check); Pawar S, Allen C, Mori M, et al. Contemporary diagnosis and treatment of aortic regurgitation: a state-of-the-art review. J Am Coll Cardiol. 2026;87(4):385-413. doi:10.1016/j.jacc.2025.10.026 — Not read (closed access); Malahfji M, Crudo V, Kaolawanich Y, et al. J Am Coll Cardiol. 2023;81(19):1885-1898. doi:10.1016/j.jacc.2023.03.001. Abstract, PubMed PMID 36882135. — PMID 36882135: optimal RVol 47 mL for the composite outcome (not AVR alone); Myerson SG, d'Arcy J, Christiansen JP, et al. Determination of clinical outcome in mitral regurgitation with cardiovascular magnetic resonance quantification. Circulation. 2016;133(23):2287-2296. doi:10.1161/CIRCULATIONAHA.115.017888 — Discussion, PDF p. 14: Myerson's 2012 AR study found an optimal volume of 42 mL
- **Proposed fix:** Cite Malahfji for 47 mL (composite outcome); the 38 mL end and 'predicting AVR' need the review or the paper it cites.
- **Proposed home:** Valvular heart disease › Background

### B3-valve-grading-15 · CMR AR outcome table: holodiastolic retrograde flow

- **Verdict:** correct
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** "Holodiastolic retrograde flow | Descending aorta | 2.8× risk of death or HF hospitalization" (cited to Ranard 2023 and Pawar 2026).
- **Source:** Kammerlander AA, Wiesinger M, Duca F, et al. Diagnostic and prognostic utility of cardiac magnetic resonance imaging in aortic regurgitation. JACC Cardiovasc Imaging. 2019;12(8 Pt 1):1474-1483. doi:10.1016/j.jcmg.2018.08.036 — Abstract only (PubMed 30448117): 232 patients with chronic AR; holodiastolic retrograde flow on CMR HR 2.774 (95% CI 1.131–6.802) for the combined endpoint of HF hospitalisation and cardiovascular death; Kammerlander AA, Wiesinger M, Duca F, et al. JACC Cardiovasc Imaging. 2019;12(8 Pt 1):1474-1483. doi:10.1016/j.jcmg.2018.08.036. Abstract, PubMed PMID 30448117. — Results, PMID 30448117
- **Proposed fix:** Optional: 'cardiovascular death or HF hospitalisation', and cite Kammerlander 2019 rather than the reviews.
- **Proposed home:** Valvular heart disease › Background

### B3-valve-grading-16 · Warning box: CMR vs echo RF discordance

- **Verdict:** source-not-readable
- **Kind:** teaching · **Topic:** Valvular heart disease
- **The page says:** "CMR-RF ≥32–35% predicts adverse outcomes — substantially lower than the echo-derived severe threshold (RF ≥50%). RF ≥50% has high specificity but poor sensitivity for identifying early LV remodeling by CMR. Among patients within guideline thresholds by echo (LVESDi <25 mm/m²), >1/3 had LVESVi ≥45 mL/m² on CMR, placing them at elevated risk."
- **Source:** Ranard LS, Bonow RO, Nishimura R, et al. Imaging methods for evaluation of chronic aortic regurgitation in adults: JACC state-of-the-art review. J Am Coll Cardiol. 2023;82(20):1953-1966. doi:10.1016/j.jacc.2023.08.051 — Not read; the passage paraphrases the reviews; Pawar S, Allen C, Mori M, et al. Contemporary diagnosis and treatment of aortic regurgitation: a state-of-the-art review. J Am Coll Cardiol. 2026;87(4):385-413. doi:10.1016/j.jacc.2025.10.026 — Not read; Hashimoto G, Enriquez-Sarano M, Stanberry LI, et al. JAMA Cardiol. 2022;7(9):924-933. doi:10.1001/jamacardio.2022.2108. Abstract, PubMed PMID 35857306. — PMID 35857306: RF ≥32% and LVESVi ≥45 mL/m² associated with outcome; the abstract does not give the '>1/3' proportion or a sensitivity/specificity for RF ≥50%; Zoghbi WA, Adams D, Bonow RO, et al. Recommendations for noninvasive evaluation of native valvular regurgitation: a report from the American Society of Echocardiography developed in collaboration with the Society for Cardiovascular Magnetic Resonance. J Am Soc Echocardiogr. 2017;30(4):303-371. doi:10.1016/j.echo.2017.01.007 — Table 11, p. 340 (PDF p. 38): RF ≥50% severe
- **Proposed fix:** Trace the '>1/3' figure and the sensitivity/specificity claim to their paper, or drop them; the 32% and 50% figures stand.
- **Proposed home:** Valvular heart disease › Background

### B3-valve-grading-17 · CMR LV remodelling table: LVESVi ≥43 mL/m² (Malahfji)

- **Verdict:** correct
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** "LVESVi | ≥43 mL/m² | 2–3× higher adverse outcome risk (Malahfji)"
- **Source:** Malahfji M, Crudo V, Kaolawanich Y, et al. Influence of cardiac remodeling on clinical outcomes in patients with aortic regurgitation. J Am Coll Cardiol. 2023;81(19):1885-1898. doi:10.1016/j.jacc.2023.03.001 — Abstract only (PubMed 36882135): iLVES volume ≥43 mL/m² HR 2.53 (95% CI 1.75–3.66); Malahfji M, Crudo V, Kaolawanich Y, et al. J Am Coll Cardiol. 2023;81(19):1885-1898. doi:10.1016/j.jacc.2023.03.001. Abstract, PubMed PMID 36882135. — Results, PMID 36882135; Praz F, Borger MA, Lanz J, et al. 2025 ESC/EACTS Guidelines for the management of valvular heart disease. Eur Heart J. 2025;46(44):4635-4736. doi:10.1093/eurheartj/ehaf194 (co-published in Eur J Cardiothorac Surg. 2025;67(8):ezaf276. doi:10.1093/ejcts/ezaf276). — Section 7.4, p. 26: 'A volumetric cut-off value of LVESVi ≥43 mL/m² using CMR was recently proposed' (refs 240 Hashimoto, 241 Malahfji)
- **Proposed home:** Valvular heart disease › Background

### B3-valve-grading-18 · CMR LV remodelling table: LVESVi ≥45 mL/m²

- **Verdict:** wrong
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** "LVESVi | ≥45 mL/m² | Independent predictor of death/HF with preserved EF; ESC/EACTS 2025 Class IIb trigger" (cited to Pawar 2026).
- **Source:** Hashimoto G, Enriquez-Sarano M, Stanberry LI, et al. JAMA Cardiol. 2022;7(9):924-933. doi:10.1001/jamacardio.2022.2108. Abstract, PubMed PMID 35857306. — PMID 35857306: LVESVi ≥45 mL/m² independently associated with death, HF hospitalisation or NYHA progression in patients with no or minimal symptoms (ejection fraction not stated in the abstract); Praz F, Borger MA, Lanz J, et al. 2025 ESC/EACTS Guidelines for the management of valvular heart disease. Eur Heart J. 2025;46(44):4635-4736. doi:10.1093/eurheartj/ehaf194 (co-published in Eur J Cardiothorac Surg. 2025;67(8):ezaf276. doi:10.1093/ejcts/ezaf276). — Recommendation Table 3, p. 28: AV surgery may be considered (IIb) in asymptomatic severe AR with LVESDi >22 mm/m² or LVESVi >45 mL/m² or resting LVEF ≤55%, if surgical risk is low; text p. 26 '>45 mL/m²'
- **Proposed fix:** ESC 2025's IIb trigger is LVESVi >45 mL/m² (low surgical risk); cite Hashimoto 2022 for ≥45 and say its population was patients with no or minimal symptoms.
- **Proposed home:** Valvular heart disease › Background

### B3-valve-grading-19 · CMR LV remodelling table: LVEDVi ≥109 mL/m² (Malahfji)

- **Verdict:** correct
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** "LVEDVi | ≥109 mL/m² | Associated with adverse outcomes (Malahfji)"
- **Source:** Malahfji M, Crudo V, Kaolawanich Y, et al. Influence of cardiac remodeling on clinical outcomes in patients with aortic regurgitation. J Am Coll Cardiol. 2023;81(19):1885-1898. doi:10.1016/j.jacc.2023.03.001 — Abstract only (PubMed 36882135): indexed LV end-diastolic volume ≥109 mL/m² independently associated with the outcomes; Malahfji M, Crudo V, Kaolawanich Y, et al. J Am Coll Cardiol. 2023;81(19):1885-1898. doi:10.1016/j.jacc.2023.03.001. Abstract, PubMed PMID 36882135. — Results, PMID 36882135
- **Proposed home:** Valvular heart disease › Background

### B3-valve-grading-20 · CMR LV remodelling table: LVEDVi >155 mL/m²

- **Verdict:** source-not-readable
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** "LVEDVi | >155 mL/m² | Predicts poor reverse remodeling post-AVR" (cited to Pawar 2026).
- **Source:** Pawar S, Allen C, Mori M, et al. Contemporary diagnosis and treatment of aortic regurgitation: a state-of-the-art review. J Am Coll Cardiol. 2026;87(4):385-413. doi:10.1016/j.jacc.2025.10.026 — Not read (closed access; jacc.org bot check)
- **Proposed fix:** Trace to the paper Pawar cites, or drop the row until it can be checked.
- **Proposed home:** Valvular heart disease › Background

### B3-valve-grading-21 · CMR LV remodelling table: CMR-GLS

- **Verdict:** source-not-readable
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** "CMR-GLS | Worse than −16% to −19% | Abnormal strain; associated with adverse outcomes" (cited to Ranard 2023).
- **Source:** Ranard LS, Bonow RO, Nishimura R, et al. Imaging methods for evaluation of chronic aortic regurgitation in adults: JACC state-of-the-art review. J Am Coll Cardiol. 2023;82(20):1953-1966. doi:10.1016/j.jacc.2023.08.051 — Not read (jacc.org bot check)
- **Proposed fix:** Trace to the paper Ranard cites, or drop the row until it can be checked.
- **Proposed home:** Valvular heart disease › Background

### B3-valve-grading-22 · CMR LV remodelling table: indexed ECV ≥24 mL/m²

- **Verdict:** correct
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** "Indexed ECV | ≥24 mL/m² | Associated with mortality and progression to AVR" (cited to Ranard 2023).
- **Source:** Senapati A, Malahfji M, Debs D, et al. Regional replacement and diffuse interstitial fibrosis in aortic regurgitation: prognostic implications from cardiac magnetic resonance. JACC Cardiovasc Imaging. 2021;14(11):2170-2182. doi:10.1016/j.jcmg.2021.04.028 — Abstract only (PubMed 34274265): 177 patients with chronic AR; iECV associated with the composite of death and need for AVR; RF ≥30% with iECV ≥24 mL/m² had the highest event rate; Senapati A, Malahfji M, Debs D, et al. JACC Cardiovasc Imaging. 2021;14(11):2170-2182. doi:10.1016/j.jcmg.2021.04.028. Abstract, PubMed PMID 34274265. — Results, PMID 34274265
- **Proposed fix:** Optional: cite Senapati 2021 and say the highest risk was RF ≥30% with iECV ≥24 mL/m² (composite of death or AVR).
- **Proposed home:** Valvular heart disease › Background

### B3-valve-grading-23 · Tip: volumes outperform linear dimensions

- **Verdict:** source-not-readable
- **Kind:** teaching · **Topic:** Valvular heart disease
- **The page says:** "LVESDi >25 mm/m² (current guideline threshold) misses >1/3 of patients with CMR LVESVi ≥45 mL/m². Measure true volumetric indices — diameter is a surrogate. ESC/EACTS 2025 now formally incorporates LVESVi alongside linear triggers."
- **Source:** Praz F, Borger MA, Lanz J, et al. 2025 ESC/EACTS Guidelines for the management of valvular heart disease. Eur Heart J. 2025;46(44):4635-4736. doi:10.1093/eurheartj/ehaf194 (co-published in Eur J Cardiothorac Surg. 2025;67(8):ezaf276. doi:10.1093/ejcts/ezaf276). — Recommendation Table 3, p. 28: LVESDi >25 mm/m² class I; LVESVi >45 mL/m² IIb; p. 26: CMR LVESVi ≥43 'appears to have better predictive value than LV diameter'; Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — AR timing recommendation 4, e107 (PDF p. 36): LVESDi >25 mm/m² (2a); Pawar S, Allen C, Mori M, et al. Contemporary diagnosis and treatment of aortic regurgitation: a state-of-the-art review. J Am Coll Cardiol. 2026;87(4):385-413. doi:10.1016/j.jacc.2025.10.026 — Not read; the '>1/3' figure is from the reviews
- **Proposed fix:** The LVESDi and ESC statements stand; trace '>1/3' to its paper or drop it.
- **Proposed home:** Valvular heart disease › Background

### B3-valve-grading-24 · AR intervention table: rows 1–7

- **Verdict:** correct
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** "Symptomatic severe AR | I | ACC/AHA 2020; ESC/EACTS 2025"; "Asymptomatic severe AR + LVEF ≤55% | I | ACC/AHA 2020"; "Asymptomatic severe AR + LVEF ≤50% | I | ESC/EACTS 2025"; "Asymptomatic severe AR + LVESD >50 mm or LVESDi >25 mm/m² | I (ESC) · IIa (ACC/AHA) | Both"; "Severe AR at time of other cardiac surgery | I | Both"; "LVEF declining to 55–60% on ≥3 serial studies | IIb | ACC/AHA 2020"; "Progressive LVEDD >65 mm | IIb | ACC/AHA 2020".
- **Source:** Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — Recommendations for Timing of Intervention for Chronic AR, e107 (PDF p. 36): 1 symptomatic (I); 2 LVEF ≤55% (I); 3 other cardiac surgery (I); 4 LVESD >50 mm or LVESDi >25 mm/m² with LVEF >55% (2a); 6 low surgical risk with LVEF decline on ≥3 serial studies to 55–60% or LVEDD >65 mm (2b); Praz F, Borger MA, Lanz J, et al. 2025 ESC/EACTS Guidelines for the management of valvular heart disease. Eur Heart J. 2025;46(44):4635-4736. doi:10.1093/eurheartj/ehaf194 (co-published in Eur J Cardiothorac Surg. 2025;67(8):ezaf276. doi:10.1093/ejcts/ezaf276). — Recommendation Table 3, p. 28: symptomatic (I B); asymptomatic LVESD >50 mm or LVESDi >25 mm/m² or resting LVEF ≤50% (I B); asymptomatic or symptomatic undergoing CABG or ascending-aorta surgery (I C)
- **Proposed fix:** Optional: add 'low surgical risk' to the two ACC/AHA IIb rows; ESC's Class I for concomitant surgery names CABG or ascending-aorta surgery.
- **Proposed home:** Valvular heart disease › Management

### B3-valve-grading-25 · AR intervention table: ESC IIb row

- **Verdict:** wrong
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** "Low-risk asymptomatic: LVESDi >22 mm/m² or LVESVi ≥45 mL/m² | IIb | ESC/EACTS 2025"
- **Source:** Praz F, Borger MA, Lanz J, et al. 2025 ESC/EACTS Guidelines for the management of valvular heart disease. Eur Heart J. 2025;46(44):4635-4736. doi:10.1093/eurheartj/ehaf194 (co-published in Eur J Cardiothorac Surg. 2025;67(8):ezaf276. doi:10.1093/ejcts/ezaf276). — Recommendation Table 3, p. 28: IIb in asymptomatic severe AR with LVESDi >22 mm/m² or LVESVi >45 mL/m² (especially small BSA) or resting LVEF ≤55%, if surgical risk is low; Figure 5 p. 27 same
- **Proposed fix:** "Low surgical risk, asymptomatic: LVESDi >22 mm/m² or LVESVi >45 mL/m² or resting LVEF ≤55% | IIb | ESC/EACTS 2025".
- **Proposed home:** Valvular heart disease › Management

### B3-valve-grading-26 · Aortic root dilation table: normal values

- **Verdict:** wrong
- **Kind:** normal-values · **Topic:** Valvular heart disease
- **The page says:** "Aortic Root Dilation by CT/CMR", Normal: aortic annulus "<25 mm/m²"; sinus of Valsalva "♂ <40 mm, ♀ <36 mm"; ascending aorta "<40 mm". No source given.
- **Source:** Lang RM, Badano LP, Mor-Avi V, et al. Recommendations for cardiac chamber quantification by echocardiography in adults: an update from the American Society of Echocardiography and the European Association of Cardiovascular Imaging. J Am Soc Echocardiogr. 2015;28(1):1-39.e14. doi:10.1016/j.echo.2014.10.003 — Table 14 'Aortic root dimensions in normal adults', p. 32: annulus 2.6 ± 0.3 cm men, 2.3 ± 0.2 cm women, indexed 1.3 ± 0.1 cm/m²; sinuses 3.4 ± 0.3 / 3.0 ± 0.3 cm; proximal ascending aorta 3.0 ± 0.4 / 2.7 ± 0.4 cm; pp. 31–32: echo leading-edge convention (CT/CMR use inner-edge), BSA- and age-based nomograms preferred
- **Proposed fix:** Annulus normal is about 13 mm/m² (1.3 ± 0.1 cm/m²), not <25; sinus <40/<36 mm matches ASE's mean + 2 SD; ascending aorta mean + 2 SD is 38 mm (men) and 35 mm (women). Say these are echo values.
- **Question for the owner:** The table is headed 'by CT/CMR' but the only readable normal values are echo (ASE 2015): keep echo values with that label, or source CT/CMR normals?
- **Proposed home:** Valvular heart disease › Measurement

### B3-valve-grading-27 · Aortic root dilation table: surgery thresholds

- **Verdict:** wrong · **management**
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** Consider surgery: sinus of Valsalva "♂ ≥55 mm (≥50 mm in Marfan/bicuspid)"; ascending aorta "≥55 mm (≥45 mm in bicuspid)"; annulus "—".
- **Source:** Praz F, Borger MA, Lanz J, et al. 2025 ESC/EACTS Guidelines for the management of valvular heart disease. Eur Heart J. 2025;46(44):4635-4736. doi:10.1093/eurheartj/ehaf194 (co-published in Eur J Cardiothorac Surg. 2025;67(8):ezaf276. doi:10.1093/ejcts/ezaf276). — Section 7.4, p. 28: surgery recommended in all patients with root or ascending aneurysm ≥55 mm; 50 mm may be considered with additional risk factors in selected low-risk patients at experienced centres; ≥45 mm concomitant replacement when AV surgery is indicated (Recommendation Table 3, IIa C); Marfan thresholds deferred to the 2024 ESC aortic guideline; Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — Section 5.1.2.1, BAV aorta replacement, e110–e111 (PDF pp. 39–40): >5.5 cm (I); 5.0–5.5 cm with a risk factor (2a); ≥4.5 cm when SAVR is indicated (2a); 5.0–5.5 cm, low risk, no risk factor (2b); no Marfan threshold
- **Proposed fix:** ≥55 mm for root or ascending aorta in everyone (not men only); 50–55 mm with risk factors (BAV, ACC/AHA) or in selected low-risk patients (ESC); ≥45 mm only when aortic valve surgery is already indicated. The Marfan figure needs the aortic guideline.
- **Proposed home:** Valvular heart disease › Management

### B3-valve-grading-28 · AR references

- **Verdict:** source-not-readable
- **Kind:** provenance · **Topic:** Valvular heart disease
- **The page says:** "1. Ranard LS, Bonow RO, Nishimura R, et al. Imaging Methods for Evaluation of Chronic Aortic Regurgitation in Adults: JACC State-of-the-Art Review. J Am Coll Cardiol. 2023;82(20):1953–1966." "2. Pawar S, Allen C, Mori M, et al. Contemporary Diagnosis and Treatment of Aortic Regurgitation: A State-of-the-Art Review. J Am Coll Cardiol. 2026;87(4):385–413."
- **Source:** Ranard LS, Bonow RO, Nishimura R, et al. Imaging methods for evaluation of chronic aortic regurgitation in adults: JACC state-of-the-art review. J Am Coll Cardiol. 2023;82(20):1953-1966. doi:10.1016/j.jacc.2023.08.051 — Not read (jacc.org bot check); Crossref metadata for doi 10.1016/j.jacc.2023.08.051 matches the citation (JACC 82(20):1953-1966, Nov 2023); Pawar S, Allen C, Mori M, et al. Contemporary diagnosis and treatment of aortic regurgitation: a state-of-the-art review. J Am Coll Cardiol. 2026;87(4):385-413. doi:10.1016/j.jacc.2025.10.026 — Not read (closed access); Crossref metadata for doi 10.1016/j.jacc.2025.10.026 matches the citation (JACC 87(4):385-413, Feb 2026)
- **Proposed fix:** Keep the reviews as further reading but cite the primary papers for the numbers (Myerson 2012, Hashimoto 2022, Malahfji 2023, Kammerlander 2019, Senapati 2021).
- **Proposed home:** Valvular heart disease › Background

### B3-valve-grading-29 · Mitral stenosis table

- **Verdict:** outdated · **management**
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** MVA by PHT and by planimetry (cm²): Mild ">1.5", Moderate "1.0–1.5", Severe "<1.0"; Mean Gradient "<5", "5–10", ">10" mmHg; PASP "<30", "30–50", ">50" mmHg.
- **Source:** Baumgartner H, Hung J, Bermejo J, et al. Echocardiographic assessment of valve stenosis: EAE/ASE recommendations for clinical practice. J Am Soc Echocardiogr. 2009;22(1):1-23. doi:10.1016/j.echo.2008.11.029 — Table 9 'Recommendations for classification of mitral stenosis severity', p. 17: these exact values; p. 1, ASE's note: the 2014 AHA/ACC stages and valve areas 'should be used instead of the descriptions and values for mitral stenosis in ASE's 2009 guideline'; Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — Table 16 'Stages of MS', e113 (PDF p. 42): progressive MVA >1.5 cm², PHT <150 ms; severe (C, D) MVA ≤1.5 cm², PHT ≥150 ms, PASP >50 mmHg as a consequence; mean gradient left out of the criteria (usually >5–10 mmHg in severe MS); Table 5 e81 (PDF p. 10): echo intervals by MVA; Praz F, Borger MA, Lanz J, et al. 2025 ESC/EACTS Guidelines for the management of valvular heart disease. Eur Heart J. 2025;46(44):4635-4736. doi:10.1093/eurheartj/ehaf194 (co-published in Eur J Cardiothorac Surg. 2025;67(8):ezaf276. doi:10.1093/ejcts/ezaf276). — Section 10.2.1, p. 46: MVA ≤1.5 cm² with clinical factors indicates clinically severe MS
- **Proposed fix:** Use the ACC/AHA stages: severe MS MVA ≤1.5 cm² (PHT ≥150 ms), progressive >1.5 cm²; give mean gradient and PASP as consequences, not grades. An MVA of 1.0–1.5 cm² is severe, not moderate.
- **Proposed home:** Valvular heart disease › Categories

### B3-valve-grading-30 · Wilkins score tip

- **Verdict:** wrong · **management**
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** "Echocardiographic score for MitraClip/PBMV suitability: leaflet mobility, thickening, calcification, subvalvular thickening. Score ≤8 = favorable for PBMV."
- **Source:** Baumgartner H, Hung J, Bermejo J, et al. Echocardiographic assessment of valve stenosis: EAE/ASE recommendations for clinical practice. J Am Soc Echocardiogr. 2009;22(1):1-23. doi:10.1016/j.echo.2008.11.029 — Table 5 'Assessment of mitral valve anatomy according to the Wilkins score', p. 14: four items, total 4–16; p. 14–15: scores predict the result of balloon mitral commissurotomy, with limited predictive value; Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — Section 6.2.3, item 6, e118 (PDF p. 47): Wilkins morphology score >8 less likely to have an optimal PMBC result; Praz F, Borger MA, Lanz J, et al. 2025 ESC/EACTS Guidelines for the management of valvular heart disease. Eur Heart J. 2025;46(44):4635-4736. doi:10.1093/eurheartj/ehaf194 (co-published in Eur J Cardiothorac Surg. 2025;67(8):ezaf276. doi:10.1093/ejcts/ezaf276). — Section 10.2.1, p. 46: scoring systems assess suitability for percutaneous mitral commissurotomy
- **Proposed fix:** Drop 'MitraClip': the Wilkins score assesses suitability for balloon commissurotomy (PBMV) in rheumatic MS; ≤8 favourable.
- **Proposed home:** Valvular heart disease › Management

### B3-valve-grading-31 · Primary MR echo table, with caption

- **Verdict:** correct
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** Mild RF "<30", RVol "<30", EROA "<0.20", VC "<3"; Moderate "30–39", "30–44", "0.20–0.29", "3–6.9"; Moderate–Severe "40–49", "45–59", "0.30–0.39", "—"; Severe "≥50", "≥60", "≥0.40", "≥7". Caption: "ACC/AHA 2020 / ASE integrated echocardiographic grading for primary (degenerative) MR."
- **Source:** Zoghbi WA, Adams D, Bonow RO, et al. Recommendations for noninvasive evaluation of native valvular regurgitation: a report from the American Society of Echocardiography developed in collaboration with the Society for Cardiovascular Magnetic Resonance. J Am Soc Echocardiogr. 2017;30(4):303-371. doi:10.1016/j.echo.2017.01.007 — Table 8 'Grading the severity of chronic MR by echocardiography', p. 332 (PDF p. 30): EROA <0.20, 0.20–0.29, 0.30–0.39, ≥0.40; RVol <30, 30–44, 45–59, ≥60; RF <30, 30–39, 40–49, ≥50; VCW <0.3, intermediate, ≥0.7 cm (>0.8 biplane); Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — Table 17 'Stages of Chronic Primary MR', e121 (PDF p. 50): severe VC ≥0.7 cm, RVol ≥60 mL, RF ≥50%, ERO ≥0.40 cm²; Praz F, Borger MA, Lanz J, et al. 2025 ESC/EACTS Guidelines for the management of valvular heart disease. Eur Heart J. 2025;46(44):4635-4736. doi:10.1093/eurheartj/ehaf194 (co-published in Eur J Cardiothorac Surg. 2025;67(8):ezaf276. doi:10.1093/ejcts/ezaf276). — Figure 10, p. 39: severe MR VC ≥7 mm (≥8 mm biplane), EROA ≥40 mm², RVol ≥60 mL, RF ≥50%
- **Proposed home:** Valvular heart disease › Categories

### B3-valve-grading-32 · Secondary MR table: ESC/EACVI column

- **Verdict:** outdated · **management**
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** "Hemodynamically Significant (ESC/EACVI)": EROA "≥0.20 cm²", RVol "≥30 mL".
- **Source:** Praz F, Borger MA, Lanz J, et al. 2025 ESC/EACTS Guidelines for the management of valvular heart disease. Eur Heart J. 2025;46(44):4635-4736. doi:10.1093/eurheartj/ehaf194 (co-published in Eur J Cardiothorac Surg. 2025;67(8):ezaf276. doi:10.1093/ejcts/ezaf276). — Section 9.2.2, p. 42: 'An EROA of ≥30 mm² and/or an RVol of ≥45 mL has been identified as having a significant impact on outcomes'; Figure 10 p. 39: severe EROA ≥40 mm² (or ≥30 mm² if elliptical orifice), RVol ≥60 mL (or ≥45 mL in low flow); Zoghbi WA, Adams D, Bonow RO, et al. Recommendations for noninvasive evaluation of native valvular regurgitation: a report from the American Society of Echocardiography developed in collaboration with the Society for Cardiovascular Magnetic Resonance. J Am Soc Echocardiogr. 2017;30(4):303-371. doi:10.1016/j.echo.2017.01.007 — Secondary MR, p. 334 (PDF p. 32): EROA ≥0.2 cm² portends a worse prognosis, but the committee kept the primary-MR cut-offs for severe
- **Proposed fix:** ESC 2025: EROA ≥30 mm² and/or RVol ≥45 mL carry prognostic weight in secondary MR; severe is EROA ≥40 mm² (≥30 mm² if the orifice is elliptical) and RVol ≥60 mL (≥45 mL in low flow).
- **Proposed home:** Valvular heart disease › Categories

### B3-valve-grading-33 · Secondary MR table: ACC/AHA (COAPT) column

- **Verdict:** wrong · **management**
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** "Intervention Threshold (ACC/AHA — COAPT criteria)": EROA "≥0.30 cm²", RVol "≥30 mL".
- **Source:** Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — Section 7.3.1 e127 (PDF p. 56): severe secondary MR now defined as for primary (ERO ≥0.4 cm², RVol ≥60 mL); Table 18 e128 (PDF p. 57): severe ERO ≥0.40 cm², RVol ≥60 mL, RF ≥50%; Recommendations for Intervention for Secondary MR, 1 (2a), e129 (PDF p. 58): TEER for chronic severe secondary MR with LVEF 20–50%, LVESD ≤70 mm, PASP ≤70 mmHg and persistent symptoms on GDMT (COAPT criteria; COAPT mean ERO 0.41 cm² vs MITRA-FR 0.31)
- **Proposed fix:** ACC/AHA's TEER criterion is severe secondary MR (EROA ≥0.40 cm², RVol ≥60 mL, RF ≥50%) plus the COAPT selection criteria (LVEF 20–50%, LVESD ≤70 mm, PASP ≤70 mmHg, symptoms on GDMT).
- **Proposed home:** Valvular heart disease › Management

### B3-valve-grading-34 · Warning box: primary vs secondary MR thresholds

- **Verdict:** wrong · **management**
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** "EROA ≥0.40 cm² and RVol ≥60 mL define severe primary MR. In secondary MR, EROA ≥0.20 cm² (ESC/EACVI) represents hemodynamically significant disease with adverse outcomes. An EROA of 0.30–0.35 cm² is moderate–severe in primary MR but constitutes the ACC/AHA intervention threshold in secondary MR."
- **Source:** Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — e127 (PDF p. 56) and Table 18 e128 (PDF p. 57): severe secondary MR ERO ≥0.40 cm², the same as primary; Praz F, Borger MA, Lanz J, et al. 2025 ESC/EACTS Guidelines for the management of valvular heart disease. Eur Heart J. 2025;46(44):4635-4736. doi:10.1093/eurheartj/ehaf194 (co-published in Eur J Cardiothorac Surg. 2025;67(8):ezaf276. doi:10.1093/ejcts/ezaf276). — Section 9.2.2 p. 42 and Figure 10 p. 39 (see B3-valve-grading-32); Zoghbi WA, Adams D, Bonow RO, et al. Recommendations for noninvasive evaluation of native valvular regurgitation: a report from the American Society of Echocardiography developed in collaboration with the Society for Cardiovascular Magnetic Resonance. J Am Soc Echocardiogr. 2017;30(4):303-371. doi:10.1016/j.echo.2017.01.007 — Table 8, p. 332 (PDF p. 30): 0.30–0.39 cm² is the moderate-to-severe subgroup
- **Proposed fix:** Keep the first sentence; replace the rest with ACC/AHA (severe secondary MR = EROA ≥0.40 cm², as for primary) and ESC 2025 (EROA ≥30 mm² / RVol ≥45 mL prognostic; lower severe cut-offs for an elliptical orifice or low flow).
- **Proposed home:** Valvular heart disease › Categories

### B3-valve-grading-35 · CMR assessment of MR: method

- **Verdict:** wrong · **management**
- **Kind:** protocol · **Topic:** Valvular heart disease
- **The page says:** "Method: LV stroke volume − Ao net forward flow = MR regurgitant volume. This indirect method is the reference standard. Phase-contrast directly at the mitral valve is less reliable due to through-plane valve motion."
- **Source:** Zoghbi WA, Adams D, Bonow RO, et al. Recommendations for noninvasive evaluation of native valvular regurgitation: a report from the American Society of Echocardiography developed in collaboration with the Society for Cardiovascular Magnetic Resonance. J Am Soc Echocardiogr. 2017;30(4):303-371. doi:10.1016/j.echo.2017.01.007 — Table 3 'CMR methods for valvular regurgitation', p. 315 (PDF p. 13): MR preferred method (LV SV) − (AO total forward SV), footnote 'not affected by the presence of concomitant valvular regurgitant lesions'; text p. 315: direct phase contrast at the mitral or tricuspid valve is more difficult because of annular motion; p. 331 (PDF p. 29): suggested preference order; Myerson SG, d'Arcy J, Christiansen JP, et al. Determination of clinical outcome in mitral regurgitation with cardiovascular magnetic resonance quantification. Circulation. 2016;133(23):2287-2296. doi:10.1161/CIRCULATIONAHA.115.017888 — Methods, PDF p. 8: 'deduction of aortic flow from LV stroke volume (LVSV – aortic forward flow)'
- **Proposed fix:** "LV stroke volume − aortic total forward flow" (not net: with net flow any aortic regurgitant volume is counted as MR); call it the preferred method (ASE/SCMR 2017).
- **Proposed home:** Valvular heart disease › Measurement

### B3-valve-grading-36 · CMR outcome data in primary MR (Myerson) table

- **Verdict:** correct
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** "RVol | ≤55 mL | 91% 5-year survival without surgery"; "RVol | >55 mL | 21% 5-year survival without surgery"; "RF | ≤40% | Favorable long-term outcome"; "RF | >40% | Adverse outcomes — parallel to RVol >55 mL".
- **Source:** Myerson SG, d'Arcy J, Christiansen JP, et al. Determination of clinical outcome in mitral regurgitation with cardiovascular magnetic resonance quantification. Circulation. 2016;133(23):2287-2296. doi:10.1161/CIRCULATIONAHA.115.017888 — Abstract, PDF p. 3, and Results, PDF p. 11: 109 asymptomatic patients with echo moderate or severe MR (functional MR excluded, Methods PDF p. 5); RVol ≤55 mL 91% free of symptoms or surgery at 5 years vs 21% with >55 mL; similar separation for RF above and below 40%, further separation above 50%
- **Proposed fix:** Optional: the outcome is survival free of symptoms or other indications for surgery (not survival), in asymptomatic patients.
- **Proposed home:** Valvular heart disease › Background

### B3-valve-grading-37 · Note: CMR RF threshold for MR

- **Verdict:** wrong
- **Kind:** teaching · **Topic:** Valvular heart disease
- **The page says:** "CMR RF >40% predicts adverse outcomes in primary MR — lower than the echo-derived severe threshold of RF ≥50%. The same direction of discordance seen in AR applies: CMR detects hemodynamically significant disease at lower RF values than echo-based criteria."
- **Source:** Myerson SG, d'Arcy J, Christiansen JP, et al. Determination of clinical outcome in mitral regurgitation with cardiovascular magnetic resonance quantification. Circulation. 2016;133(23):2287-2296. doi:10.1161/CIRCULATIONAHA.115.017888 — Discussion, PDF p. 14: MR thresholds (55 mL, 40%, more risk above 50%) are 'close to' the AHA-ACC echo thresholds (60 mL, 50%), whereas for AR the AHA-ACC thresholds are higher than the CMR optimum (33%, 42 mL); thresholds for MR and AR 'should differ'
- **Proposed fix:** Say that Myerson's MR thresholds (55 mL, 40%) sit close to the echo cut-offs (60 mL, 50%), unlike AR's; drop 'the same direction of discordance seen in AR applies'.
- **Proposed home:** Valvular heart disease › Background

### B3-valve-grading-38 · TR table: mild, moderate and severe rows (VC, EROA, RVol)

- **Verdict:** correct
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** VC width (mm) "<3", "3–6.9", "7–13.9"; EROA (cm²) "<0.20", "0.20–0.39", "0.40–0.59"; RVol (mL/beat) "<30", "30–44", "45–59" (mild, moderate, severe).
- **Source:** Zoghbi WA, Adams D, Bonow RO, et al. Recommendations for noninvasive evaluation of native valvular regurgitation: a report from the American Society of Echocardiography developed in collaboration with the Society for Cardiovascular Magnetic Resonance. J Am Soc Echocardiogr. 2017;30(4):303-371. doi:10.1016/j.echo.2017.01.007 — Table 14 'Grading the severity of chronic TR by echocardiography', p. 350 (PDF p. 48): VCW <0.3, 0.3–0.69, ≥0.7 cm; EROA <0.20, 0.20–0.39, ≥0.40 cm²; RVol <30, 30–44, ≥45 mL; Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — Table 20 'Stages of TR', e132 (PDF p. 61): severe VC ≥0.7 cm, ERO ≥0.40 cm², RVol ≥45 mL; Praz F, Borger MA, Lanz J, et al. 2025 ESC/EACTS Guidelines for the management of valvular heart disease. Eur Heart J. 2025;46(44):4635-4736. doi:10.1093/eurheartj/ehaf194 (co-published in Eur J Cardiothorac Surg. 2025;67(8):ezaf276. doi:10.1093/ejcts/ezaf276). — Figure 15, p. 50: severe TR VC ≥7 mm, EROA ≥40 mm², RVol ≥45 mL/beat, RF ≥50%; Go YY, Dulgheru R, Lancellotti P. The conundrum of tricuspid regurgitation grading. Front Cardiovasc Med. 2018;5:164. doi:10.3389/fcvm.2018.00164 — Table 1 (proposed grading): severe 7–13.9 mm, 40–59 mm², 45–59 mL (upper limits only in the 5-grade proposal)
- **Proposed home:** Valvular heart disease › Categories

### B3-valve-grading-39 · TR table: massive and torrential rows (VC, EROA, RVol)

- **Verdict:** correct
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** Massive: VC "14–20" mm, EROA "0.60–0.79" cm², RVol "60–74" mL; Torrential: VC "≥21", EROA "≥0.80", RVol "≥75".
- **Source:** Go YY, Dulgheru R, Lancellotti P. The conundrum of tricuspid regurgitation grading. Front Cardiovasc Med. 2018;5:164. doi:10.3389/fcvm.2018.00164 — Table 1 'Proposed tricuspid regurgitation grading': VC 14–20 and >21 mm (abstract: ≥21); EROA by PISA 60–79 and ≥80 mm²; RVol by PISA 60–74 and ≥75 mL; footnote 'further data required'; Praz F, Borger MA, Lanz J, et al. 2025 ESC/EACTS Guidelines for the management of valvular heart disease. Eur Heart J. 2025;46(44):4635-4736. doi:10.1093/eurheartj/ehaf194 (co-published in Eur J Cardiothorac Surg. 2025;67(8):ezaf276. doi:10.1093/ejcts/ezaf276). — Section 11.2, p. 49: a five-grade scheme 'has been proposed' and used in studies; 'an intervention should be considered without delay, as soon as TR is severe'; Hahn RT, Zamorano JL. The need for a new tricuspid regurgitation grading scheme. Eur Heart J Cardiovasc Imaging. 2017;18(12):1342-1343. doi:10.1093/ehjci/jex139 — Not read (the original proposal; closed access)
- **Proposed fix:** Optional: label the two grades as a proposal (Hahn and Zamorano 2017, restated by Go 2018), not guideline grades, and say EROA is by PISA.
- **Proposed home:** Valvular heart disease › Categories

### B3-valve-grading-40 · TR table: 3D vena contracta area column

- **Verdict:** wrong · **management**
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** VCA — 3DE (cm²): Mild "<0.20", Moderate "0.20–0.40", Severe "0.40–0.88", Massive "0.88–1.26", Torrential ">1.26"; caption: "VCA (3DE vena contracta area) thresholds from Adamo et al EHJ 2025 secondary TR outcomes study."
- **Source:** Zoghbi WA, Adams D, Bonow RO, et al. Recommendations for noninvasive evaluation of native valvular regurgitation: a report from the American Society of Echocardiography developed in collaboration with the Society for Cardiovascular Magnetic Resonance. J Am Soc Echocardiogr. 2017;30(4):303-371. doi:10.1016/j.echo.2017.01.007 — TR vena contracta, p. 350 (PDF p. 48): 'a VCA >0.4 cm² is a reasonable cutoff value for severe TR'; no mild/moderate VCA values; Praz F, Borger MA, Lanz J, et al. 2025 ESC/EACTS Guidelines for the management of valvular heart disease. Eur Heart J. 2025;46(44):4635-4736. doi:10.1093/eurheartj/ehaf194 (co-published in Eur J Cardiothorac Surg. 2025;67(8):ezaf276. doi:10.1093/ejcts/ezaf276). — Figure 15, p. 50: severe TR '3D VCA ≥75 mm²'; Benzoni G, Tomaselli M, Radu N, et al. Threshold values of vena contracta area for grading secondary tricuspid regurgitation and its association with outcomes. J Am Soc Echocardiogr. 2026;39(2):156-166. doi:10.1016/j.echo.2025.10.015 — Abstract only (PubMed 41177341): secondary TR, 204 patients; mild <0.43, moderate 0.43–0.67, severe 0.68–0.88, massive 0.89–1.26, torrential >1.26 cm²; Benzoni G, Tomaselli M, Radu N, et al. J Am Soc Echocardiogr. 2026;39(2):156-166. doi:10.1016/j.echo.2025.10.015. Abstract, PubMed PMID 41177341. — Results, PMID 41177341; Go YY, Dulgheru R, Lancellotti P. The conundrum of tricuspid regurgitation grading. Front Cardiovasc Med. 2018;5:164. doi:10.3389/fcvm.2018.00164 — Table 1: 3D EROA severe 75–94, massive 95–114, torrential ≥115 mm²
- **Proposed fix:** Drop the column or give one scheme with its source: ASE 2017 (VCA >0.4 cm² severe) and ESC 2025 (≥0.75 cm²) disagree, and Benzoni 2026's five grades (severe 0.68–0.88 cm², secondary TR) are the only source for the massive/torrential cut-offs; the mild/moderate values match nothing. No 'Adamo et al EHJ 2025' study was found.
- **Question for the owner:** Which 3D VCA cut-off for severe TR should the page use: ASE 2017's >0.4 cm², ESC 2025's ≥0.75 cm², or Benzoni 2026's five grades (secondary TR only)?
- **Proposed home:** Valvular heart disease › Categories

### B3-valve-grading-41 · TR table caption: sources and endorsements

- **Verdict:** wrong
- **Kind:** provenance · **Topic:** Valvular heart disease
- **The page says:** "2D VC width and EROA from Hahn et al / Go et al 2018 — endorsed by ESC/EACTS 2025 and 2025 ACC Expert Consensus Decision Pathway on TR. VCA (3DE vena contracta area) thresholds from Adamo et al EHJ 2025 secondary TR outcomes study."
- **Source:** Hahn RT, Zamorano JL. The need for a new tricuspid regurgitation grading scheme. Eur Heart J Cardiovasc Imaging. 2017;18(12):1342-1343. doi:10.1093/ehjci/jex139 — Not read; Hahn and Zamorano's proposal is Eur Heart J Cardiovasc Imaging 2017;18:1342-3 (2017, not 2018); Go YY, Dulgheru R, Lancellotti P. The conundrum of tricuspid regurgitation grading. Front Cardiovasc Med. 2018;5:164. doi:10.3389/fcvm.2018.00164 — Table 1 and Table 2: restates the proposal (Front Cardiovasc Med 2018); Praz F, Borger MA, Lanz J, et al. 2025 ESC/EACTS Guidelines for the management of valvular heart disease. Eur Heart J. 2025;46(44):4635-4736. doi:10.1093/eurheartj/ehaf194 (co-published in Eur J Cardiothorac Surg. 2025;67(8):ezaf276. doi:10.1093/ejcts/ezaf276). — Section 11.2, p. 49: the five-grade scheme 'has been proposed'; the guideline does not adopt it and keeps intervention at 'severe'; O'Gara PT, Lindenfeld J, Hahn RT, et al. 10 issues for the clinician in tricuspid regurgitation evaluation and management: 2025 ACC Expert Consensus Decision Pathway: a report of the American College of Cardiology Solution Set Oversight Committee. J Am Coll Cardiol. 2026;87(4):447-486. doi:10.1016/j.jacc.2025.07.002 — Not read (jacc.org bot check); Benzoni G, Tomaselli M, Radu N, et al. J Am Soc Echocardiogr. 2026;39(2):156-166. doi:10.1016/j.echo.2025.10.015. Abstract, PubMed PMID 41177341. — PMID 41177341: the 5-grade VCA outcome study for secondary TR (JASE 2026), not Adamo/EHJ
- **Proposed fix:** Credit the grades to Hahn and Zamorano 2017 (restated by Go 2018); ESC 2025 mentions them as proposed, not endorsed; replace 'Adamo et al EHJ 2025' with the real VCA source (or drop the column); the ACC 2025 pathway is unchecked.
- **Proposed home:** Valvular heart disease › Background

### B3-valve-grading-42 · Note on 5-tier TR grading: origin and prognosis

- **Verdict:** correct
- **Kind:** teaching · **Topic:** Valvular heart disease
- **The page says:** "Massive and torrential grades were developed because most patients enrolled in transcatheter tricuspid valve intervention (TTVI) trials had TR severity above traditional severe thresholds. These grades carry independent prognostic weight: massive TR ... is associated with greater RV adverse remodeling and increased mortality vs lower-grade severe TR."
- **Source:** Go YY, Dulgheru R, Lancellotti P. The conundrum of tricuspid regurgitation grading. Front Cardiovasc Med. 2018;5:164. doi:10.3389/fcvm.2018.00164 — Abstract and 'Expanding the TR grading': patients in intervention trials had TR up to 2 grades above the severe thresholds; prognosis worsens as TR increases; Praz F, Borger MA, Lanz J, et al. 2025 ESC/EACTS Guidelines for the management of valvular heart disease. Eur Heart J. 2025;46(44):4635-4736. doi:10.1093/eurheartj/ehaf194 (co-published in Eur J Cardiothorac Surg. 2025;67(8):ezaf276. doi:10.1093/ejcts/ezaf276). — Section 11.2, p. 49: the five-grade scale 'may be associated with a proportional increase in symptoms and event risk' (refs 694, 695)
- **Proposed fix:** Optional: soften 'carry independent prognostic weight' to ESC's 'may be associated with a proportional increase in symptoms and event risk'.
- **Proposed home:** Valvular heart disease › Background

### B3-valve-grading-43 · Note on 5-tier TR grading: VC >9.2 mm for massive TR

- **Verdict:** unsourced
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** "massive TR (VC >9.2 mm by outcomes analysis)"
- **Source:** none found
- **Proposed fix:** Drop '(VC >9.2 mm by outcomes analysis)' unless its paper is found; it also conflicts with the table's massive VC of 14–20 mm.
- **Proposed home:** Valvular heart disease › Background

### B3-valve-grading-44 · Note on 5-tier TR grading: ACC 2025 referral advice

- **Verdict:** source-not-readable
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** "The 2025 ACC Expert Consensus recommends referral to advanced heart disease specialists for moderate or greater TR with progressive heart failure symptoms."
- **Source:** O'Gara PT, Lindenfeld J, Hahn RT, et al. 10 issues for the clinician in tricuspid regurgitation evaluation and management: 2025 ACC Expert Consensus Decision Pathway: a report of the American College of Cardiology Solution Set Oversight Committee. J Am Coll Cardiol. 2026;87(4):447-486. doi:10.1016/j.jacc.2025.07.002 — Not read (jacc.org bot check; no open copy)
- **Proposed fix:** Check against the ACC 2025 TR pathway once a copy is supplied; until then label it unchecked.
- **Proposed home:** Valvular heart disease › Management

### B3-valve-grading-45 · RVSP estimation from the TR jet

- **Verdict:** correct
- **Kind:** teaching · **Topic:** Valvular heart disease
- **The page says:** "RVSP estimation (TR jet): RVSP = 4 × V²TR + RAP"
- **Source:** Mukherjee M, Rudski LG, Addetia K, et al. Guidelines for the echocardiographic assessment of the right heart in adults and special considerations in pulmonary hypertension: recommendations from the American Society of Echocardiography. J Am Soc Echocardiogr. 2025;38(3):141-186. doi:10.1016/j.echo.2025.01.006 — Right Ventricular Systolic Pressure, p. 160 (PDF p. 20): 'RVSP = [4 × (peak TR velocity)²] + RAP'
- **Proposed home:** Valvular heart disease › Measurement

### B3-valve-grading-46 · RAP estimate from the IVC

- **Verdict:** correct
- **Kind:** normal-values · **Topic:** Valvular heart disease
- **The page says:** "RAP estimate: 3 mmHg (normal IVC), 8 mmHg (borderline), 15 mmHg (dilated, non-collapsing IVC)"
- **Source:** Mukherjee M, Rudski LG, Addetia K, et al. Guidelines for the echocardiographic assessment of the right heart in adults and special considerations in pulmonary hypertension: recommendations from the American Society of Echocardiography. J Am Soc Echocardiogr. 2025;38(3):141-186. doi:10.1016/j.echo.2025.01.006 — Right Atrial Pressure, p. 160 (PDF p. 20): IVC ≤2.1 cm collapsing ≥50% → 3 mmHg (0–5); enlarged IVC without ≥50% collapse → 15 mmHg (10–20); indeterminate → 8 mmHg (5–10); 20 mmHg may be used if the IVC is >2.5 cm without variation with spontaneous contrast or reflux; report a single value
- **Proposed fix:** Optional: give the criteria (IVC 2.1 cm, 50% collapse with sniff) and cite ASE's 2025 right heart guideline (it replaces the 2010 one).
- **Proposed home:** Valvular heart disease › Measurement

### B3-valve-grading-47 · Pulmonary regurgitation CMR table: RF

- **Verdict:** wrong · **management**
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** RF (%): Mild "<20", Moderate "20–39", Severe "≥40".
- **Source:** Zoghbi WA, Adams D, Bonow RO, et al. Recommendations for noninvasive evaluation of native valvular regurgitation: a report from the American Society of Echocardiography developed in collaboration with the Society for Cardiovascular Magnetic Resonance. J Am Soc Echocardiogr. 2017;30(4):303-371. doi:10.1016/j.echo.2017.01.007 — Table 16 'Echocardiographic and Doppler parameters useful in grading PR severity', p. 358 (PDF p. 56): RF <20%, 20%–40%, >40% (RF data primarily from CMR); CMR Methods in Evaluating PR, p. 358: 'RF <20% to define mild PR, 20%-40% for moderate, and >40% for severe PR'
- **Proposed fix:** Moderate 20–40%, severe >40%: an RF of exactly 40% is moderate in ASE/SCMR 2017, severe on the page.
- **Proposed home:** Valvular heart disease › Categories

### B3-valve-grading-48 · Pulmonary regurgitation CMR table: RVol

- **Verdict:** unsourced · **management**
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** RVol (mL/beat): Mild "<30", Moderate "30–44", Severe "≥45".
- **Source:** Zoghbi WA, Adams D, Bonow RO, et al. Recommendations for noninvasive evaluation of native valvular regurgitation: a report from the American Society of Echocardiography developed in collaboration with the Society for Cardiovascular Magnetic Resonance. J Am Soc Echocardiogr. 2017;30(4):303-371. doi:10.1016/j.echo.2017.01.007 — CMR Methods in Evaluating PR, p. 358 (PDF p. 56): 'RVol categories for PR severity by CMR have not been defined'
- **Proposed fix:** Drop the RVol column (ASE/SCMR 2017: no CMR RVol categories for PR), or name its source.
- **Question for the owner:** Are the PR RVol bands (<30, 30–44, ≥45 mL, the TR echo values) a local convention to keep and label, or should they go?
- **Proposed home:** Valvular heart disease › Categories

### B3-valve-grading-49 · Pulmonary regurgitation note: CMR as reference

- **Verdict:** correct
- **Kind:** teaching · **Topic:** Valvular heart disease
- **The page says:** "CMR RF by 2D PC or 4D flow at the main PA is the clinical reference for PR severity, especially in post-TOF repair follow-up."
- **Source:** Zoghbi WA, Adams D, Bonow RO, et al. Recommendations for noninvasive evaluation of native valvular regurgitation: a report from the American Society of Echocardiography developed in collaboration with the Society for Cardiovascular Magnetic Resonance. J Am Soc Echocardiogr. 2017;30(4):303-371. doi:10.1016/j.echo.2017.01.007 — CMR Methods in Evaluating PR, p. 358 (PDF p. 56): CMR is 'currently the best method to quantitate PR' in significant PR and congenital heart disease; direct phase contrast above the pulmonary valve is the preferred method
- **Proposed fix:** Optional: 4D flow is not in ASE/SCMR 2017; keep it as an alternative, not the reference.
- **Proposed home:** Valvular heart disease › Technique

### B3-valve-grading-50 · Pulmonary stenosis table

- **Verdict:** correct
- **Kind:** guideline-threshold · **Topic:** Valvular heart disease
- **The page says:** Vmax (m/s): Mild "<3.0", Moderate "3.0–4.0", Severe ">4.0"; Peak Gradient (mmHg): "<36", "36–64", ">64".
- **Source:** Baumgartner H, Hung J, Bermejo J, et al. Echocardiographic assessment of valve stenosis: EAE/ASE recommendations for clinical practice. J Am Soc Echocardiogr. 2009;22(1):1-23. doi:10.1016/j.echo.2008.11.029 — Table 11 'Grading of pulmonary stenosis', p. 20: peak velocity <3, 3–4, >4 m/s; peak gradient <36, 36–64, >64 mmHg
- **Proposed home:** Valvular heart disease › Categories

### B3-valve-grading-51 · Front-page row (shared/data/resources.ts)

- **Verdict:** wrong
- **Kind:** listing · **Topic:** Valvular heart disease
- **The page says:** Title "Valve grading", version "ACC/AHA 2020", summary "Severity thresholds for stenosis and regurgitation of each valve, by echo and CMR."
- **Source:** Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — Title page e72: the current ACC/AHA VHD guideline (2020); Zoghbi WA, Adams D, Bonow RO, et al. Recommendations for noninvasive evaluation of native valvular regurgitation: a report from the American Society of Echocardiography developed in collaboration with the Society for Cardiovascular Magnetic Resonance. J Am Soc Echocardiogr. 2017;30(4):303-371. doi:10.1016/j.echo.2017.01.007 — The page's regurgitation tables follow ASE/SCMR 2017 (Tables 8, 11, 14, 16), not ACC/AHA alone; Baumgartner H, Hung J, Bermejo J, et al. Echocardiographic assessment of valve stenosis: EAE/ASE recommendations for clinical practice. J Am Soc Echocardiogr. 2009;22(1):1-23. doi:10.1016/j.echo.2008.11.029 — Table 10, p. 19: tricuspid stenosis criteria; the page has no tricuspid stenosis section, so 'each valve' overstates it
- **Proposed fix:** Version label to match the owner's lead ruling (e.g. 'ASE 2017 · ACC/AHA 2020'); drop 'each' from the summary unless tricuspid stenosis is added.
- **Question for the owner:** Which version label once the lead is chosen (see B3-valve-grading-01)?
- **Proposed home:** Front page row: Valve grading

## Simplified Bernoulli

https://dfergs93.github.io/cardiac-imaging-resources/calculators/bernoulli/

### B3-bernoulli-01 · Page title, intro and reference box (there is none)

- **Verdict:** unsourced
- **Kind:** provenance · **Topic:** Simplified Bernoulli
- **The page says:** Title "Simplified Bernoulli"; intro "Convert between peak velocity and pressure gradient using the simplified Bernoulli equation." There is no reference box, citation, version or date anywhere on the page. None of its four grading tables (aortic, mitral, pulmonary, tricuspid) names a source.
- **Source:** Baumgartner H, Hung J, Bermejo J, et al. Recommendations on the echocardiographic assessment of aortic valve stenosis: a focused update from the European Association of Cardiovascular Imaging and the American Society of Echocardiography. J Am Soc Echocardiogr. 2017;30(4):372-392. doi:10.1016/j.echo.2017.02.009 — Pressure gradient, p. 378 (PDF p. 7): ΔP = 4v², ΔPmax = 4v²max; Table 3, p. 383 (PDF p. 12): grading of AS; Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — Table 13 Stages of AS, e91 (PDF p. 20); Table 16 Stages of MS, e113 (PDF p. 42); Baumgartner H, Hung J, Bermejo J, et al. Echocardiographic assessment of valve stenosis: EAE/ASE recommendations for clinical practice. J Am Soc Echocardiogr. 2009;22(1):1-23. doi:10.1016/j.echo.2008.11.029 — ASE note, p. 1 (2014 AHA/ACC mitral stenosis stages replace the 2009 mitral values); Table 10 (tricuspid), p. 19; Table 11 (pulmonary), p. 20; Nguyen ET, Green CR, Adams SJ, et al. CAR and CSTR Cardiac Computed Tomography (CT) Practice Guidelines: Part 2-Non-Coronary Imaging. Can Assoc Radiol J. 2024;75(3):502-517. doi:10.1177/08465371241233228 — Valvular Assessment, PDF p. 4 (print p. 505): CT is "less useful for evaluating the severity of native valve stenosis" and planimetry "tends to overestimate valve area as compared to TTE"; no stenosis grading thresholds
- **Proposed fix:** Name a source under each piece. The formula and the aortic tab come from ASE/EACVI 2017 (p. 378, Table 3) with the ACC/AHA 2020 stages (Table 13). The mitral tab comes from ACC/AHA 2020 Table 16, per ASE's note. The pulmonary and tricuspid tabs come from EAE/ASE 2009 Tables 11 and 10. CAR's cardiac CT guideline gives no stenosis grading.
- **Proposed home:** Simplified Bernoulli › Background

### B3-bernoulli-02 · Calculator: the Velocity ↔ Pressure Gradient converter (initBernoulliCalc / calcBernoulli)

- **Verdict:** correct
- **Kind:** calculator · **Topic:** Simplified Bernoulli
- **The page says:** "Formula: ΔP = 4 Vmax²". Two number fields: "Peak Velocity (m/s)" (min 0.1, max 10, step 0.01) and "Pressure Gradient (mmHg)" (min 0, max 400, step 0.1). Typing in either field fills the other. A velocity above 0 gives gradient = 4v², shown to 0.1 mmHg. A gradient of 0 or more gives velocity = √(ΔP/4), shown to 0.01 m/s. Runs on the live page (docs/audit/batch-3/cases/bernoulli_old.results.md, 34 cases): all 29 conversions came out as expected. Velocity to gradient: 4.2 → 70.6, 4 → 64.0, 3 → 36.0, 5 → 100.0, 2 → 16.0, 2.5 → 25.0, 3.9 → 60.8, 2.9 → 33.6, 1.25 → 6.3 (rounded half up). Gradient to velocity: 64 → 4.00, 36 → 3.00, 100 → 5.00, 16 → 2.00, 70.6 → 4.20, 0 → 0.00. The min and max are typing hints only: 12 m/s → 576.0, 500 mmHg → 11.18, 0.05 m/s → 0.0. The 5 'no result' runs are the expected ones: a velocity of 0, −4 or blank, and a gradient of −1 or blank. Text can't be typed into the number fields (the runner's fill was refused), so no text case ran.
- **Source:** Baumgartner H, Hung J, Bermejo J, et al. Recommendations on the echocardiographic assessment of aortic valve stenosis: a focused update from the European Association of Cardiovascular Imaging and the American Society of Echocardiography. J Am Soc Echocardiogr. 2017;30(4):372-392. doi:10.1016/j.echo.2017.02.009 — Pressure gradient, p. 378 (PDF p. 7): "DP = 4v²"; "The maximum gradient is calculated from maximum velocity: DPmax = 4v²max"; Baumgartner H, Hung J, Bermejo J, et al. Echocardiographic assessment of valve stenosis: EAE/ASE recommendations for clinical practice. J Am Soc Echocardiogr. 2009;22(1):1-23. doi:10.1016/j.echo.2008.11.029 — Pulmonary stenosis, B.1.1 Pressure gradient, p. 19: "the simplified Bernoulli equation ΔP = 4v²"
- **Proposed home:** Simplified Bernoulli › Calculator

### B3-bernoulli-03 · Calculator labels: what the converted gradient is (old page and front-page quick calculator)

- **Verdict:** wrong · **management**
- **Kind:** calculator · **Topic:** Simplified Bernoulli
- **The page says:** The old page labels its second field "Pressure Gradient (mmHg)", and the intro says it converts "between peak velocity and pressure gradient". The quick calculator's field is "Pressure gradient" and its headline reads "x.xx m/s ↔ y.y mmHg". Neither one says that the result is the peak (maximum instantaneous) gradient, that a mean gradient can't be converted, or when the proximal velocity has to be included. Directly under the converter, the mitral and tricuspid tabs and the aortic Mean Gradient column grade by mean gradient. Two examples: a mitral peak velocity of 2 m/s converts to 16 mmHg, which the mitral tab's mean-gradient column calls severe (>10); an AS mean gradient of 40 mmHg typed in returns 3.16 m/s, a moderate velocity.
- **Source:** Baumgartner H, Hung J, Bermejo J, et al. Recommendations on the echocardiographic assessment of aortic valve stenosis: a focused update from the European Association of Cardiovascular Imaging and the American Society of Echocardiography. J Am Soc Echocardiogr. 2017;30(4):372-392. doi:10.1016/j.echo.2017.02.009 — Pressure gradient, p. 378 (PDF p. 7): DPmax = 4v²max; the mean gradient "requires averaging of instantaneous mean gradients and cannot be calculated from the mean velocity"; "When the proximal velocity is over 1.5 m/s or the transvalvular velocity is < 3.0 m/s, the proximal velocity should be included in the Bernoulli equation", DPmax = 4(v²max − v²proximal); Baumgartner H, Hung J, Bermejo J, et al. Echocardiographic assessment of valve stenosis: EAE/ASE recommendations for clinical practice. J Am Soc Echocardiogr. 2009;22(1):1-23. doi:10.1016/j.echo.2008.11.029 — p. 10: "a maximum jet velocity of 4 m/s corresponds to a mean gradient of ~40 mmHg and a maximum velocity of 3 m/s corresponds to a mean gradient of ~20 mmHg"; Table 8, p. 17: mitral mean gradient ΔP = Σ4v²/N
- **Proposed fix:** Label the field "Peak gradient" on both, and add one line: the mean gradient is traced from the Doppler envelope and can't be converted from a velocity. If the proximal (LVOT) velocity is over 1.5 m/s or Vmax is under 3.0 m/s, use ΔP = 4(Vmax² − Vproximal²) (ASE/EACVI 2017 p. 378).
- **Proposed home:** Simplified Bernoulli › Calculator

### B3-bernoulli-04 · Aortic tab: Normal row

- **Verdict:** wrong
- **Kind:** guideline-threshold · **Topic:** Aortic stenosis
- **The page says:** "Normal | Valve Area (cm²) ≥2.0 | Vmax (m/s) <2.0 | Peak Gradient (mmHg) <10 | Mean Gradient (mmHg) <5".
- **Source:** Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — Table 13 Stages of AS, e91 (PDF p. 20): stage A, at risk of AS, "Aortic Vmax <2 m/s with normal leaflet motion"; Baumgartner H, Hung J, Bermejo J, et al. Recommendations on the echocardiographic assessment of aortic valve stenosis: a focused update from the European Association of Cardiovascular Imaging and the American Society of Echocardiography. J Am Soc Echocardiogr. 2017;30(4):372-392. doi:10.1016/j.echo.2017.02.009 — Table 3, p. 383 (PDF p. 12): no normal column; "Aortic sclerosis" peak velocity ≤2.5 m/s, with no gradient or area; Baumgartner H, Hung J, Bermejo J, et al. Echocardiographic assessment of valve stenosis: EAE/ASE recommendations for clinical practice. J Am Soc Echocardiogr. 2009;22(1):1-23. doi:10.1016/j.echo.2008.11.029 — p. 10: "A normal AVA in adults is ~3.0–4.0 cm²"
- **Proposed fix:** Keep Vmax <2.0 m/s (ACC/AHA stage A) and drop the area and gradient cells, or correct them. A normal AVA is about 3.0–4.0 cm² (EAE/ASE 2009 p. 10). 2.0 m/s is a peak of 16 mmHg, so '<10' leaves 10–16 mmHg in no row, and no source gives a normal mean gradient.
- **Proposed home:** Aortic stenosis › Categories

### B3-bernoulli-05 · Aortic tab: Mild row

- **Verdict:** wrong · **management**
- **Kind:** guideline-threshold · **Topic:** Aortic stenosis
- **The page says:** "Mild | 1.6–2.0 | 2.0–2.9 | 16–36 | <25" (valve area cm², Vmax m/s, peak gradient mmHg, mean gradient mmHg). A mean gradient of 20–24 mmHg therefore reads mild.
- **Source:** Baumgartner H, Hung J, Bermejo J, et al. Recommendations on the echocardiographic assessment of aortic valve stenosis: a focused update from the European Association of Cardiovascular Imaging and the American Society of Echocardiography. J Am Soc Echocardiogr. 2017;30(4):372-392. doi:10.1016/j.echo.2017.02.009 — Table 3, p. 383 (PDF p. 12): mild peak velocity 2.6–2.9 m/s (aortic sclerosis ≤2.5), mean gradient <20 mmHg, AVA >1.5 cm², indexed AVA >0.85; Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — Table 13, e91 (PDF p. 20): stage B "Mild AS: aortic Vmax 2.0–2.9 m/s or mean ΔP <20 mm Hg"; Table 5, e81 (PDF p. 10): echo every 3–5 y for mild, every 1–2 y for moderate
- **Proposed fix:** Make the mean gradient <20 mmHg (both sources) and the valve area >1.5 cm² (ASE/EACVI). The 16–36 peak gradient is 4v² of the row's velocities (2.0 → 16, 3.0 → 36; 2.9 m/s gives 33.6), not a guideline column.
- **Question for the owner:** For a Vmax of 2.0–2.5 m/s, ACC/AHA 2020 says mild AS (stage B, echo every 3–5 years), while ASE/EACVI 2017 says aortic sclerosis and starts mild at 2.6 m/s. Which should the row follow, or should it show both? This is the same lead question as on the valve-grading page.
- **Proposed home:** Aortic stenosis › Categories

### B3-bernoulli-06 · Aortic tab: Moderate row

- **Verdict:** wrong · **management**
- **Kind:** guideline-threshold · **Topic:** Aortic stenosis
- **The page says:** "Moderate | 1.0–1.5 | 3.0–3.9 | 36–64 | 25–40". The 64 mmHg and 40 mmHg limits also appear in the Severe row (≥64, ≥40).
- **Source:** Baumgartner H, Hung J, Bermejo J, et al. Recommendations on the echocardiographic assessment of aortic valve stenosis: a focused update from the European Association of Cardiovascular Imaging and the American Society of Echocardiography. J Am Soc Echocardiogr. 2017;30(4):372-392. doi:10.1016/j.echo.2017.02.009 — Table 3, p. 383 (PDF p. 12): moderate peak velocity 3.0–4.0 m/s, mean gradient 20–40 mmHg, AVA 1.0–1.5 cm², indexed AVA 0.60–0.85; Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — Table 13, e91 (PDF p. 20): "Moderate AS: aortic Vmax 3.0–3.9 m/s or mean ΔP 20–39 mm Hg"; Table 5, e81 (PDF p. 10): moderate, echo every 1–2 y
- **Proposed fix:** Make the mean gradient 20–39 mmHg (ACC/AHA; ASE/EACVI writes 20–40, with severe at ≥40), so that 40 falls only in Severe, and make the peak gradient 36 to <64. The area and velocity are right.
- **Proposed home:** Aortic stenosis › Categories

### B3-bernoulli-07 · Aortic tab: Severe row

- **Verdict:** correct
- **Kind:** guideline-threshold · **Topic:** Aortic stenosis
- **The page says:** "Severe | <1.0 or indexed <0.6 | ≥4.0 | ≥64 | ≥40".
- **Source:** Baumgartner H, Hung J, Bermejo J, et al. Recommendations on the echocardiographic assessment of aortic valve stenosis: a focused update from the European Association of Cardiovascular Imaging and the American Society of Echocardiography. J Am Soc Echocardiogr. 2017;30(4):372-392. doi:10.1016/j.echo.2017.02.009 — Table 3, p. 383 (PDF p. 12): severe peak velocity ≥4.0 m/s, mean gradient ≥40 mmHg, AVA <1.0 cm², indexed AVA <0.6; text, p. 383: any one of AVA <1.0, peak velocity ≥4.0 or mean gradient ≥40 "can be considered to suggest severe AS"; Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — Table 13, e91 (PDF p. 20): stages C–D "Aortic Vmax ≥4 m/s or mean ΔP ≥40 mm Hg", "AVA typically is ≤1.0 cm² (or AVAi 0.6 cm²/m²) but not required to define severe AS"; very severe AS "Vmax ≥5 m/s or mean P ≥60 mm Hg"; Praz F, Borger MA, Lanz J, et al. 2025 ESC/EACTS Guidelines for the management of valvular heart disease. Eur Heart J. 2025;46(44):4635-4736. doi:10.1093/eurheartj/ehaf194 (co-published in Eur J Cardiothorac Surg. 2025;67(8):ezaf276. doi:10.1093/ejcts/ezaf276). — Section 8.2, p. 29: high-gradient AS "mean gradient ≥40 mmHg, Vmax ≥4.0 m/s, AVA ≤1 cm² (or ≤0.6 cm²/m²)"
- **Proposed home:** Aortic stenosis › Categories

### B3-bernoulli-08 · Mitral tab: Normal row

- **Verdict:** wrong · **management**
- **Kind:** guideline-threshold · **Topic:** Mitral stenosis
- **The page says:** "Normal | MVA (cm²) >2.0 | Mean Gradient -- | PAP --". So an MVA of 2.0–4.0 cm² reads normal.
- **Source:** Baumgartner H, Hung J, Bermejo J, et al. Echocardiographic assessment of valve stenosis: EAE/ASE recommendations for clinical practice. J Am Soc Echocardiogr. 2009;22(1):1-23. doi:10.1016/j.echo.2008.11.029 — p. 16: "The normal MVA is 4.0–5.0 cm². An MVA area of >1.5 cm² usually does not produce symptoms"; Table 9, p. 17: mild >1.5 cm² (no upper limit); Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — Table 16 Stages of MS, e113 (PDF p. 42): stage A "Mild valve doming during diastole", "Normal transmitral flow velocity"; stage B progressive MS "Mitral valve area >1.5 cm²"; Table 5, e81 (PDF p. 10): stage B MS (MV area >1.5 cm²) echo every 3–5 y
- **Proposed fix:** A normal MVA is 4.0–5.0 cm² (EAE/ASE 2009 p. 16), and an MVA above 1.5 cm² with rheumatic changes is progressive MS (ACC/AHA stage B). Replace '>2.0' with stage A's description (doming, normal transmitral velocity), or drop the row.
- **Proposed home:** Mitral stenosis › Categories

### B3-bernoulli-09 · Mitral tab: Mild row

- **Verdict:** outdated · **management**
- **Kind:** guideline-threshold · **Topic:** Mitral stenosis
- **The page says:** "Mild | 1.5–2.0 | <5 | <30" (MVA cm², mean gradient mmHg, PAP mmHg). An MVA of exactly 1.5 cm² falls in both Mild and Moderate.
- **Source:** Baumgartner H, Hung J, Bermejo J, et al. Echocardiographic assessment of valve stenosis: EAE/ASE recommendations for clinical practice. J Am Soc Echocardiogr. 2009;22(1):1-23. doi:10.1016/j.echo.2008.11.029 — Table 9, p. 17: mild valve area >1.5 cm², mean gradient <5 mmHg (footnote: "At heart rates between 60 and 80 bpm and in sinus rhythm"), pulmonary artery pressure <30 mmHg; ASE note, p. 1: the 2014 AHA/ACC stages and valve areas "should be used instead of the descriptions and values for mitral stenosis in ASE's 2009 guideline"; Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — Table 16, e113 (PDF p. 42): stage B progressive MS, MVA >1.5 cm², diastolic pressure half-time <150 ms; footnote: the mean gradient "has not been included in the criteria for severity"
- **Proposed fix:** Follow ACC/AHA 2020 Table 16: progressive MS (stage B) is an MVA >1.5 cm² with a half-time <150 ms, and an MVA of 1.5 is already severe. The mean gradient and PAP are not staging criteria; the 2009 gradients held only at 60–80 bpm in sinus rhythm.
- **Proposed home:** Mitral stenosis › Categories

### B3-bernoulli-10 · Mitral tab: Moderate row

- **Verdict:** outdated · **management**
- **Kind:** guideline-threshold · **Topic:** Mitral stenosis
- **The page says:** "Moderate | 1.0–1.5 | 5–10 | 30–50".
- **Source:** Baumgartner H, Hung J, Bermejo J, et al. Echocardiographic assessment of valve stenosis: EAE/ASE recommendations for clinical practice. J Am Soc Echocardiogr. 2009;22(1):1-23. doi:10.1016/j.echo.2008.11.029 — Table 9, p. 17: moderate 1.0–1.5 cm², 5–10 mmHg, 30–50 mmHg; ASE note, p. 1 (superseded by the 2014 AHA/ACC stages); Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — Table 16, e113 (PDF p. 42): stages C (asymptomatic) and D (symptomatic) severe MS, MVA ≤1.5 cm², half-time ≥150 ms, PASP >50 mmHg; section 6.1, e113: "a mitral valve area ≤1.5 cm² is considered severe, which typically corresponds to a transmitral mean gradient of >5 mmHg to 10 mmHg at a normal heart rate"; section 6.2.3 recommendation 1, e116 (PDF p. 45): symptomatic severe MS (MVA ≤1.5 cm², stage D) with favourable morphology, PMBC recommended (COR 1); Table 5, e81: MV area 1.0–1.5 cm², echo every 1–2 y; Praz F, Borger MA, Lanz J, et al. 2025 ESC/EACTS Guidelines for the management of valvular heart disease. Eur Heart J. 2025;46(44):4635-4736. doi:10.1093/eurheartj/ehaf194 (co-published in Eur J Cardiothorac Surg. 2025;67(8):ezaf276. doi:10.1093/ejcts/ezaf276). — Section 10.2.1 Evaluation (rheumatic mitral stenosis), p. 46: "An MVA of ≤1.5 cm² in conjunction with clinical factors ... is indicative of clinically severe MS"
- **Proposed fix:** Severe MS is an MVA ≤1.5 cm² (ACC/AHA 2020 stages C and D; 'clinically severe' in ESC/EACTS 2025), with a half-time ≥150 ms and a PASP >50 mmHg as its consequence. There is no moderate stage, and a mean gradient of 5–10 mmHg is typical of severe MS.
- **Proposed home:** Mitral stenosis › Categories

### B3-bernoulli-11 · Mitral tab: Severe row

- **Verdict:** outdated
- **Kind:** guideline-threshold · **Topic:** Mitral stenosis
- **The page says:** "Severe | <1.0 | >10 | >50".
- **Source:** Baumgartner H, Hung J, Bermejo J, et al. Echocardiographic assessment of valve stenosis: EAE/ASE recommendations for clinical practice. J Am Soc Echocardiogr. 2009;22(1):1-23. doi:10.1016/j.echo.2008.11.029 — Table 9, p. 17: severe <1.0 cm², >10 mmHg, >50 mmHg; ASE note, p. 1 (superseded by the 2014 AHA/ACC stages); Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — Table 16, e113 (PDF p. 42): severe MVA ≤1.5 cm², half-time ≥150 ms, "Elevated PASP >50 mm Hg" as a consequence, mean gradient not a criterion; Table 5, e81 (PDF p. 10): MV area <1.0 cm², echo every year
- **Proposed fix:** Make Severe an MVA ≤1.5 cm² (stage C asymptomatic, D symptomatic) with a half-time ≥150 ms and a PASP >50 mmHg as its consequence, and drop the >10 mmHg gradient (Table 16 footnote). An MVA <1.0 cm² now only sets yearly echo follow-up (Table 5).
- **Proposed home:** Mitral stenosis › Categories

### B3-bernoulli-12 · Pulmonary tab: Normal row and the Mild row's lower limit

- **Verdict:** unsourced
- **Kind:** guideline-threshold · **Topic:** Pulmonary stenosis
- **The page says:** "Normal | Peak Gradient (mmHg) <10", and Mild given as "10–36".
- **Source:** Baumgartner H, Hung J, Bermejo J, et al. Echocardiographic assessment of valve stenosis: EAE/ASE recommendations for clinical practice. J Am Soc Echocardiogr. 2009;22(1):1-23. doi:10.1016/j.echo.2008.11.029 — Table 11, p. 20: mild peak velocity <3 m/s, peak gradient <36 mmHg, with no normal column and no lower limit; text, p. 20: "Mild stenosis: peak jet velocity is: <3 m/s (peak gradient less than 36 mmHg)"; Otto CM, Nishimura RA, Bonow RO, et al. 2020 ACC/AHA guideline for the management of patients with valvular heart disease: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines. Circulation. 2021;143(5):e72-e227. doi:10.1161/CIR.0000000000000923 (also J Am Coll Cardiol. 2021;77(4):e25-e197). — Section 9 Pulmonic Valve Disease, e135 (PDF p. 64): refers to the guidelines for adults with congenital heart disease
- **Proposed fix:** Drop the Normal row and the lower limit, so that Mild reads <36 mmHg (<3 m/s), as in Table 11.
- **Question for the owner:** Keep 'Normal <10 mmHg' for the pulmonary valve as labelled local practice, or drop it? No audit source gives a normal pulmonary valve gradient.
- **Proposed home:** Pulmonary stenosis › Categories

### B3-bernoulli-13 · Pulmonary tab: Mild, Moderate and Severe rows

- **Verdict:** correct
- **Kind:** guideline-threshold · **Topic:** Pulmonary stenosis
- **The page says:** "Mild | 10–36", "Moderate | 36–64", "Severe | >64" (peak gradient, mmHg).
- **Source:** Baumgartner H, Hung J, Bermejo J, et al. Echocardiographic assessment of valve stenosis: EAE/ASE recommendations for clinical practice. J Am Soc Echocardiogr. 2009;22(1):1-23. doi:10.1016/j.echo.2008.11.029 — Table 11, p. 20: peak gradient mild <36, moderate 36–64, severe >64 mmHg (peak velocity <3, 3–4, >4 m/s), from the 2006 ACC/AHA guideline; text, p. 20: "In determining the need for intervention, no specific Doppler gradients have been agreed on"
- **Proposed home:** Pulmonary stenosis › Categories

### B3-bernoulli-14 · Tricuspid tab: haemodynamically significant tricuspid stenosis

- **Verdict:** wrong · **management**
- **Kind:** guideline-threshold · **Topic:** Tricuspid stenosis
- **The page says:** "Hemodynamically Significant | Mean Gradient (mmHg) >5 | Valve Area (cm²) <1.0", and no other rows. A mean gradient of exactly 5 mmHg, or an area of exactly 1.0 cm², is significant by the lead source but not by the page.
- **Source:** Baumgartner H, Hung J, Bermejo J, et al. Echocardiographic assessment of valve stenosis: EAE/ASE recommendations for clinical practice. J Am Soc Echocardiogr. 2009;22(1):1-23. doi:10.1016/j.echo.2008.11.029 — Table 10, p. 19: specific findings "Mean pressure gradient ≥5 mmHg", "Inflow time–velocity integral >60 cm", "T1/2 ≥190 ms", "Valve area by continuity equation ≤1 cm²"; supportive findings "Enlarged right atrium ≥moderate", "Dilated inferior vena cava"; footnote: with more than mild TR the derived area is underestimated, but ≤1 cm² still implies a significant burden; Praz F, Borger MA, Lanz J, et al. 2025 ESC/EACTS Guidelines for the management of valvular heart disease. Eur Heart J. 2025;46(44):4635-4736. doi:10.1093/eurheartj/ehaf194 (co-published in Eur J Cardiothorac Surg. 2025;67(8):ezaf276. doi:10.1093/ejcts/ezaf276). — Section 12.2 Evaluation, p. 54: "A mean diastolic transvalvular gradient of >5 mmHg at a normal heart rate indicates severe TS"
- **Proposed fix:** Use a mean gradient ≥5 mmHg and a valve area ≤1.0 cm² (by continuity), add an inflow VTI >60 cm and T1/2 ≥190 ms, and list RA enlargement ≥moderate and a dilated IVC as supportive (EAE/ASE 2009 Table 10). Add a note that ESC/EACTS 2025 (p. 54) differs at the edge: there, >5 mmHg at a normal heart rate is severe.
- **Proposed home:** Tricuspid stenosis › Categories

### B3-bernoulli-15 · Front-page quick calculator (shared/calculators/bernoulli.ts): formula, rounding, limits, citation

- **Verdict:** correct
- **Kind:** calculator · **Topic:** Simplified Bernoulli
- **The page says:** Fields "Peak velocity" (m/s; min 0.1, max 10, step 0.01; placeholder 4.2) and "Pressure gradient" (mmHg; min 0, max 400, step 0.1; placeholder 70.6). compute fills the other field: a typed velocity above 0 gives 4v² to 0.1 mmHg, and a typed gradient of 0 or more gives √(ΔP/4) to 0.01 m/s. The headline reads "x.xx m/s ↔ y.y mmHg" with the detail "ΔP = 4v²"; otherwise it shows "Enter a peak velocity or a pressure gradient." implements: 'none'. Citation: "Baumgartner H et al. Recommendations on the echocardiographic assessment of aortic valve stenosis: a focused update from the EACVI and ASE. J Am Soc Echocardiogr 2017;30:372–392." Runs (docs/audit/batch-3/cases/bernoulli_module.results.md, 39 cases): every conversion equals the old page's run of the same input. A velocity of 0 or −4, a gradient of −1, and a run with no field just typed give the prompt. Blank and 'abc' are not read as numbers (the 4 'input not accepted' runs, as intended). When both fields hold values, the field just typed wins (4 m/s with 999 mmHg → 64.0). At the cut-offs the headline pairs a rounded velocity with the typed gradient: 63.9 mmHg → "4.00 m/s ↔ 63.9 mmHg", and 3.999 m/s → "4.00 m/s ↔ 64.0 mmHg".
- **Source:** Baumgartner H, Hung J, Bermejo J, et al. Recommendations on the echocardiographic assessment of aortic valve stenosis: a focused update from the European Association of Cardiovascular Imaging and the American Society of Echocardiography. J Am Soc Echocardiogr. 2017;30(4):372-392. doi:10.1016/j.echo.2017.02.009 — Title page, p. 372 (PDF p. 1): Baumgartner H et al., J Am Soc Echocardiogr 2017;30(4):372–392; Pressure gradient, p. 378 (PDF p. 7): DPmax = 4v²max
- **Proposed home:** Simplified Bernoulli › Calculator

### B3-bernoulli-16 · Front-page row (shared/data/resources.ts, id bernoulli)

- **Verdict:** correct
- **Kind:** listing · **Topic:** Simplified Bernoulli
- **The page says:** Title "Simplified Bernoulli", version "none", calculator: true, summary "Converts peak velocity to pressure gradient and back, with stenosis grading."
- **Source:** Baumgartner H, Hung J, Bermejo J, et al. Recommendations on the echocardiographic assessment of aortic valve stenosis: a focused update from the European Association of Cardiovascular Imaging and the American Society of Echocardiography. J Am Soc Echocardiogr. 2017;30(4):372-392. doi:10.1016/j.echo.2017.02.009 — Pressure gradient, p. 378 (PDF p. 7): ΔPmax = 4v²max
- **Proposed home:** Front page row: Simplified Bernoulli

## Across the site

### B3-cardiac-site-01 · Pointer to the scan protocols (cardiac CT and the four device-planning pages)

- **Verdict:** local-practice
- **Kind:** protocol · **Topic:** Cardiac CT
- **The page says:** The cardiac CT page opens "Scanning protocols for cardiac CT are maintained in the Radiology Protocol Manager" and the TAVR, TMVR, TTVR and LAAO pages "For scan protocols, see the Protocol Manager", each linking https://dfergs93.github.io/radiology-protocols/ct/cardiac (the old public protocols site; the link answers 200 on 2026-11-27). The coronary CT page's acquisition sections were moved there in April 2026.
- **Source:** none found
- **Proposed fix:** Follow the owner's answer at the rebuild: either link the protocols site's cardiac CT page from each topic's Technique section, or state the acquisition points the lead guidelines give (CAR/CSTR 2024 part 1 Table 1 and part 2) on the page.
- **Question for the owner:** These pages send readers to the old public protocols site for scan protocols, which the new front page deliberately doesn't link. At the rebuild, should the cardiac CT topics keep that link, or carry the guideline acquisition points themselves?
- **Proposed home:** Cardiac CT › Technique

## Calculator usability

| Page | Calculator | Words before first input | All options visible | Algorithm visible | Notes |
|---|---|---|---|---|---|
| Simplified Bernoulli | bernoulli_old | 22 | yes | yes | About 22 words before the velocity field: the title, the one-line intro, the formula, the card heading and the label. The two number fields sit side by side and are both visible, with the formula ΔP = 4Vmax² above them. The grading tables are below in four tabs, and only Aortic shows without a click (Mitral, Pulmonary and Tricuspid each need one). Clearing or zeroing a field leaves the other field's last value in place, because calcBernoulli writes only on a valid entry; this was read in the code, not run. So a stale pair can show, for example 64.0 mmHg beside an emptied velocity. A velocity typed as negative (a jet away from the transducer) gives nothing, with no message. Letters can't be typed into the fields. |
| Simplified Bernoulli | bernoulli_module | 15 | yes | yes | Opens under the front-page row: the title and an 11-word summary, then the first label. Two fields. The result line shows the formula (ΔP = 4v²) with every result, and the prompt otherwise. There is no grading; the full-page link has the tables. As on the old page, a field emptied after a conversion keeps the other field's last value, though the result line returns to the prompt (quick-calc.ts writes fills only on an ok result; read in the code, not run). |

## Changed after this batch started

- Pages audited on the old cardiac site at 84b6118 (pulled 2026-11-27). The Bernoulli calculators were run on 2026-11-27: the old page by typing into its live form, the front page's module through compute().
