import React from 'react'
import { Footer, FooterCopyright, FooterDivider, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from 'flowbite-react'
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitterX, BsLinkedin, BsGithub } from 'react-icons/bs';

export default function FooterCom() {
  return (
      <Footer container className='border border-t-8 border-teal-500'>
          <div className='w-full max-w-7xl mx-auto'>
              <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                  <div className="mt-5">
                  <Link
                        to="/"
                        className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
                        >
                        BLog
                        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                        Sphere
                        </span>
                    </Link>
                  </div>
                  <div className="grid grid-clos-2 gap-8 sm: mt-4 sm:grid-cols-3 sm:gap-6">
                      <div>
                        <FooterTitle title="About" />
                        <FooterLinkGroup col>
                            <FooterLink
                                href='https:/www.sumsnt'
                                target='_blank'
                                rel='noopener noreferrer'
                            >Sumant' Resume
                            </FooterLink>
                            <FooterLink
                                href='https:/www.sumsnt'
                                target='_blank'
                                rel='noopener noreferrer'
                            >Projects
                            </FooterLink>
                            <FooterLink
                                href='https:/www.sumsnt'
                                target='_blank'
                                rel='noopener noreferrer'
                            >GameDev
                            </FooterLink>
                        </FooterLinkGroup>
                      </div>
                      <div>
                        <FooterTitle title="Follow us" />
                        <FooterLinkGroup col>
                            <FooterLink
                                href='https://github.com/SumantBobade'
                                target='_blank'
                                rel='noopener noreferrer'
                            >GitHub
                            </FooterLink>
                            <FooterLink
                                href='huggingface.co/spaces/SumantBobade'
                                target='_blank'
                                rel='noopener noreferrer'
                            >Hugging Face
                            </FooterLink>
                            <FooterLink
                                href='https://www.linkedin.com/in/sumant-bobade'
                                target='_blank'
                                rel='noopener noreferrer'
                            >Linked In
                            </FooterLink>
                        </FooterLinkGroup>
                      </div>
                      <div>
                        <FooterTitle title="Legal" />
                        <FooterLinkGroup col>
                            <FooterLink
                                href='https:/www.sumsnt'
                                target='_blank'
                                rel='noopener noreferrer'
                            >Privacy Policy
                            </FooterLink>
                            <FooterLink
                                href='https:/www.sumsnt'
                                target='_blank'
                                rel='noopener noreferrer'
                            >Term & Conditation
                            </FooterLink>
                            <FooterLink
                                href='https:/www.sumsnt'
                                target='_blank'
                                rel='noopener noreferrer'
                            >Helpline
                            </FooterLink>
                        </FooterLinkGroup>
                      </div>
                  </div>
              </div>
              <FooterDivider />
              <div className="">
                  <FooterCopyright href='#' by="Sumant's Blog" year={new Date().getFullYear()}/>
              </div>
              <div className="flex gap-6 sm:mt-0 mt-9 sm:justify-center">
                  <FooterIcon href='' icon={BsFacebook}/>
                  <FooterIcon href='' icon={BsInstagram}/>
                  <FooterIcon href='' icon={BsLinkedin}/>
                  <FooterIcon href='' icon={BsTwitterX}/>
                  <FooterIcon href='' icon={BsGithub}/>
              </div>
          </div>
      </Footer>
  )
}
