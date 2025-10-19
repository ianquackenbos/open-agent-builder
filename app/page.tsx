"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSessionUser } from "@/app/providers/AuthProvider";

// Import shared components
import Button from "@/components/shared/button/Button";
import { Connector } from "@/components/shared/layout/curvy-rect";
import HeroFlame from "@/components/shared/effects/flame/hero-flame";
import AsciiExplosion from "@/components/shared/effects/flame/ascii-explosion";
import { HeaderProvider } from "@/components/shared/header/HeaderContext";

// Import hero section components
import HeroInputSubmitButton from "@/components/app/(home)/sections/hero-input/Button/Button";
import Globe from "@/components/app/(home)/sections/hero-input/_svg/Globe";
import { Endpoint } from "@/components/shared/Playground/Context/types";
import Step2Placeholder from "@/components/app/(home)/sections/step2/Step2Placeholder";
import WorkflowBuilder from "@/components/app/(home)/sections/workflow-builder/WorkflowBuilder";

// Import header components
import HeaderBrandKit from "@/components/shared/header/BrandKit/BrandKit";
import HeaderWrapper from "@/components/shared/header/Wrapper/Wrapper";
import HeaderDropdownWrapper from "@/components/shared/header/Dropdown/Wrapper/Wrapper";
import GithubIcon from "@/components/shared/header/Github/_svg/GithubIcon";
import ButtonUI from "@/components/ui/shadcn/button";

function StyleGuidePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useSessionUser();

  const [tab] = useState<Endpoint>(Endpoint.Scrape);
  const [url, setUrl] = useState<string>("");
  const [showStep2, setShowStep2] = useState(false);
  const [showWorkflowBuilder, setShowWorkflowBuilder] = useState(false);
  const [loadWorkflowId, setLoadWorkflowId] = useState<string | null>(null);
  const [loadTemplateId, setLoadTemplateId] = useState<string | null>(null);

  // Handle URL params
  useEffect(() => {
    if (!searchParams) return;

    const view = searchParams.get('view');
    const workflowId = searchParams.get('workflow');
    const templateId = searchParams.get('template');

    if (view === 'workflows') {
      setShowStep2(true);
      setShowWorkflowBuilder(false);
    } else if (workflowId) {
      setLoadWorkflowId(workflowId);
      setShowWorkflowBuilder(true);
      setShowStep2(false);
    } else if (templateId) {
      setLoadTemplateId(templateId);
      setShowWorkflowBuilder(true);
      setShowStep2(false);
    }
  }, [searchParams]);

  const handleSubmit = () => {
    setShowStep2(true);
    router.push('/?view=workflows');
  };

  const handleReset = () => {
    setShowStep2(false);
    setShowWorkflowBuilder(false);
    setLoadWorkflowId(null);
    setLoadTemplateId(null);
    setUrl("");
    router.push('/');
  };

  const handleCreateWorkflow = () => {
    setLoadWorkflowId(null);
    setLoadTemplateId(null);
    setShowWorkflowBuilder(true);
    router.push('/?view=builder');
  };

  return (
    <HeaderProvider>
      {showWorkflowBuilder ? (
        <WorkflowBuilder
          onBack={handleReset}
          initialWorkflowId={loadWorkflowId}
          initialTemplateId={loadTemplateId}
        />
      ) : (
      <div className="min-h-screen bg-background-base">
        {/* Header/Navigation Section */}
        <HeaderDropdownWrapper />
        
        <div className="sticky top-0 left-0 w-full z-[101] bg-background-base header">
          <div className="absolute top-0 cmw-container border-x border-border-faint h-full pointer-events-none" />
          
          <div className="h-1 bg-border-faint w-full left-0 -bottom-1 absolute" />
          
          <div className="cmw-container absolute h-full pointer-events-none top-0">
            <Connector className="absolute -left-[10.5px] -bottom-11" />
            <Connector className="absolute -right-[10.5px] -bottom-11" />
          </div>
          
          <HeaderWrapper>
            <div className="max-w-[900px] mx-auto w-full flex justify-between items-center">
              <div className="flex gap-24 items-center">
                <HeaderBrandKit />
              </div>
              
              <div className="flex gap-8 items-center">
                {/* GitHub Template Button */}
                <a
                  className="contents"
                  href="https://github.com/firecrawl/firecrawl"
                  target="_blank"
                >
                  <ButtonUI variant="secondary">
                    <GithubIcon />
                    Use this Template
                  </ButtonUI>
                </a>

                {/* Auth */}
                {user ? (
                  <div className="px-16 py-8 bg-brand-600 text-white rounded-8 text-body-medium font-medium">
                    {user.name}
                  </div>
                ) : (
                  <div className="px-16 py-8 bg-brand-600 text-white rounded-8 text-body-medium font-medium">
                    Loading...
                  </div>
                )}
              </div>
            </div>
          </HeaderWrapper>
        </div>

        {/* Hero Section */}
        <section className="overflow-x-clip relative" id="home-hero">
          <div className="pt-28 lg:pt-254 lg:-mt-100 pb-115 relative" id="hero-content">
            <AnimatePresence mode="wait">
              {!showStep2 ? (
                <motion.div
                  key="hero"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="relative container px-16"
                >
                  {/* Capsule Tag */}
                  <div className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm border border-white/30 rounded-full mb-8 mx-auto shadow-sm">
                    <span className="text-sm font-medium text-gray-700">
                      OpenAI Inspired Agent Builder
                    </span>
                  </div>

                  {/* Main Headline */}
                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-center">
                    <span className="text-black drop-shadow-sm">SUSE</span>{" "}
                    <span className="text-[#0066ff] drop-shadow-sm">Agent Builder</span>
                  </h1>

                  {/* Description */}
                  <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed text-center drop-shadow-sm">
                    Build intelligent web scraping workflows powered by AI. Turn any website into structured, agent-ready data.
                  </p>

                  {/* Call-to-Action Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={handleSubmit}
                      className="bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-xl"
                    >
                      Start building
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative container px-16"
                >
                  <Step2Placeholder
                    onReset={handleReset}
                    onCreateWorkflow={handleCreateWorkflow}
                    onLoadWorkflow={(id) => {
                      setLoadWorkflowId(id);
                      setLoadTemplateId(null);
                      setShowWorkflowBuilder(true);
                      router.push(`/?workflow=${id}`);
                    }}
                    onLoadTemplate={(templateId) => {
                      setLoadTemplateId(templateId);
                      setLoadWorkflowId(null);
                      setShowWorkflowBuilder(true);
                      router.push(`/?template=${templateId}`);
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
      )}
    </HeaderProvider>
  );
}

export default function StyleGuidePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StyleGuidePageContent />
    </Suspense>
  );
}